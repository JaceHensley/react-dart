
/**
 * react-dart JS interop helpers (used by react_client.dart and react_client/js_interop_helpers.dart)
 */
function _getProperty(obj, key) { return obj[key]; }
function _setProperty(obj, key, value) { return obj[key] = value; }

function _createReactDartComponentClassConfig(dartInteropStatics, componentStatics) {
  var childContextTypes;
  var contextTypes;

  var childContextKeys = jsConfig && jsConfig.childContextKeys;
  var contextKeys = jsConfig && jsConfig.contextKeys;

  if (childContextKeys && childContextKeys.length !== 0) {
    childContextTypes = {};
    for (var i = 0; i < childContextKeys.length; i++) {
      childContextTypes[childContextKeys[i]] = React.PropTypes.any;
    }
  }

  if (contextKeys && contextKeys.length !== 0) {
    contextTypes = {};
    for (var i = 0; i < contextKeys.length; i++) {
      contextTypes[contextKeys[i]] = React.PropTypes.any;
    }
  }

  return {
    getChildContext: function() {
      return dartInteropStatics.getChildContext(this.props.internal);
    },
    childContextTypes: childContextTypes,
    contextTypes: contextTypes,
    getInitialState: function() {
      this.dartComponent = dartInteropStatics.initComponent(this, this.props.internal, this.context, componentStatics);
      return {};
    },
    componentWillMount: function() {
      dartInteropStatics.handleComponentWillMount(this.dartComponent);
    },
    componentDidMount: function() {
      dartInteropStatics.handleComponentDidMount(this.dartComponent);
    },
    componentWillReceiveProps: function(nextProps, nextContext) {
      dartInteropStatics.handleComponentWillReceiveProps(this.dartComponent, nextProps.internal, nextContext);
    },
    shouldComponentUpdate: function(nextProps, nextState, nextContext) {
      return dartInteropStatics.handleShouldComponentUpdate(this.dartComponent, nextContext);
    },
    componentWillUpdate: function(nextProps, nextState, nextContext) {
      dartInteropStatics.handleComponentWillUpdate(this.dartComponent, nextContext);
    },
    componentDidUpdate: function(prevProps, prevState, prevContext) {
      dartInteropStatics.handleComponentDidUpdate(this.dartComponent, prevProps.internal, prevContext);
    },
    componentWillUnmount: function() {
      dartInteropStatics.handleComponentWillUnmount(this.dartComponent);
    },
    render: function() {
      return dartInteropStatics.handleRender(this.dartComponent);
    }
  };
}

function _markChildValidated(child) {
  var store = child._store;
  if (store) store.validated = true;
}
