/*jshint esversion:11*/

async function setVariable() {
  var _wfx_variables = {};
  var previous_wfx_variables = {};
  _wfx_variables.wfx_subglobal_value = "";
  var loc = await _wfxLibrary.location();

  if (loc.pathname == "/AES/aes" || "AMF/connect") {
    var selec_1 = await _wfxLibrary.querySelector(
      'meta[name="flow.currentState"]'
    );
    if (selec_1) {
      _wfx_variables.wfx_subglobal_value = selec_1.attributes.content;
    } else {
      var iframes = await _wfxLibrary.querySelector('[id="iframe"]');
      if (iframes && iframes.contentDocument) {
        var iframes2 = await iframes.contentDocument.querySelectorAll(
          'meta[name="flow.currentState"]'
        );
        var attr = iframes2[0].getAttribute("content");
        if (attr) {
          _wfx_variables.wfx_subglobal_value = attr;
        }
      }
    }
    // Check if the previous value is different from the current value
    if (
      JSON.stringify(previous_wfx_variables) !== JSON.stringify(_wfx_variables)
    ) {
      await _wfxLibrary.setVariable(_wfx_variables);
      previous_wfx_variables = _wfx_variables;
    }
  }
}
_wfx_settings.onBeforeGetPageOptions = async function (event) {
  await setVariable();
};
