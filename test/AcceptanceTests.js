var assert = require('assert');
var pixelmatch = require('pixelmatch');
var PNG = require('pngjs').PNG;
var fs = require('fs');
var path = require('path');
var server = require('../server.js');
server.startServer(8090);
var url = 'http://localhost:8090';

describe('Tryout#1 - ', function() {

	it('Teste de fumaça: pelo menos este teste tem que rodar', function() {
		assert(true, true)
	});

	// describe('Código HTML&CSS: ', function() {

	// 	it('O layout desktop deve ser igual ao gabarito', function () {
	// 		layoutTestRunner("assertion-desktop", 800, 600)
	//     });

	//     it('O layout mobile deve ser igual ao gabarito', function () {
	//         layoutTestRunner("assertion-mobile", 376, 667)
	//     });

	// });

	describe('Formulário de inscrição: ', function() {
		it ('Deve inscrever no processo sem erros', function() {
			browser.url(url);
			browser.click('#btn-apply-form');
			browser.waitForVisible('#apply-modal');
			browser.element('#name').setValue("ACME")
			browser.element('#email').setValue("acme@gama.academy")
			browser.click('#btn-apply')
			browser.waitForVisible('#apply-success');
		})

		it ('Não deve se inscrever no processo com nome ou email em branco', function() {
			browser.url(url);
			browser.click('#btn-apply-form');
			browser.waitForVisible('#apply-modal');
			browser.click('#btn-apply')
			browser.waitForVisible('#apply-error');
			assert.equal("Não pode estar vazio", browser.element('#feedback-name').getText());
			assert.equal("Não é válido", browser.element('#feedback-email').getText());
		})
	})
});

function layoutTestRunner(assertion_file, width, height) {
	browser.setViewportSize({
	    width: width,
	    height: height
	});
	browser.url(url);
	browser.waitForVisible('#main');
	var screenshotName = './screenshot-' + assertion_file + ".png"
	browser.saveScreenshot(screenshotName);
	var os = process.platform;
	var img1 = PNG.sync.read(fs.readFileSync(screenshotName));
	var img2 = PNG.sync.read(fs.readFileSync('./test/' + os + "-" + assertion_file + '.png'));
    var diff = new PNG({width: img1.width, height: img1.height});
    var pixelsDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
    diff.pack().pipe(fs.createWriteStream('diff' + assertion_file + '.png'));
	assert.equal(pixelsDiff, 0);
}
