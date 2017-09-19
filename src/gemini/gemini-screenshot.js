gemini.suite('index', function(suite0) {
    suite0
        .setUrl('/');
    gemini.suite('first-page-div', function(suite0_1) {
        suite0_1
            .setCaptureElements('.first-page-div')
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
    gemini.suite('second-page-div-headers', function(suite0_1) {
        suite0_1
            .setCaptureElements(['.projects-section-title-div', '.works-section-tabs-div'])
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
    gemini.suite('third-page-div-headers', function(suite0_1) {
        suite0_1
            .setCaptureElements(['.third-page-div .section-title', '.third-page-div .subtitle'])
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
    gemini.suite('third-page-div-selfintro-div', function(suite0_1) {
        suite0_1
            .setCaptureElements(['.selfintro-div'])
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
    gemini.suite('third-page-div-selfintro-p-div', function(suite0_1) {
        suite0_1
            .setCaptureElements(['.selfintro-p-div'])
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
    gemini.suite('third-page-div-footers', function(suite0_1) {
        suite0_1
            .setCaptureElements(['.footer-div', '.copyright-footer-div'])
            .capture('plain', function(actions, find) {
                actions.wait(500);
            });
    });
});