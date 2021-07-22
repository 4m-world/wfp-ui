var _excluded = ["children", "initialValues", "onSubmit"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import FormWizard from '../../components/FormWizard';
import FormControls from '../../components/FormControls';
import StepNavigation from '../../components/StepNavigation';
import StepNavigationItem from '../../components/StepNavigationItem';

var handleValidation = function handleValidation(props) {
  return null;
};

var Page = function Page(_ref) {
  var children = _ref.children;
  return children;
};

var Wizard = function Wizard(_ref2) {
  var children = _ref2.children,
      initialValues = _ref2.initialValues,
      onSubmit = _ref2.onSubmit,
      other = _objectWithoutProperties(_ref2, _excluded);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = useState(initialValues || {}),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1];

  var handleTabClick = function handleTabClick(values) {
    if (Object.keys(validate(values)).length > 0) {// console.log("not valid",validate(values))
    } else {
      setPage(values);
      setValues(values);
    }
  };

  var next = function next(values) {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(values);
  };

  var previous = function previous() {
    setPage(Math.max(page - 1, 0));
  };
  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */


  var validate = function validate(values) {
    var activePage = React.Children.toArray(children)[page];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  var handleFormSubmit = function handleFormSubmit(values) {
    var isLastPage = page === React.Children.count(children) - 1;

    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  };

  var activePage = React.Children.toArray(children)[page];
  var isLastPage = page === React.Children.count(children) - 1;
  return /*#__PURE__*/React.createElement(Form, {
    initialValues: values,
    validate: validate,
    onSubmit: handleFormSubmit
  }, function (_ref3) {
    var handleSubmit = _ref3.handleSubmit,
        submitting = _ref3.submitting,
        values = _ref3.values;
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement(FormWizard, {
      stickySidebar: true,
      formHeader: "Step ".concat(page, "/4: ").concat(activePage.props.label),
      formControls: /*#__PURE__*/React.createElement(FormControls, {
        onPreviousClick: previous,
        previousHidden: page > 0 ? false : true,
        nextHidden: isLastPage,
        submitHidden: !isLastPage,
        onSubmitClick: handleSubmit
      }),
      sidebar: /*#__PURE__*/React.createElement(StepNavigation, {
        selectedPage: page,
        onSelectionChange: handleTabClick,
        handleTabClick: handleTabClick
      }, React.Children.map(children, function (child, i) {
        // Ignore the first child
        return /*#__PURE__*/React.createElement(StepNavigationItem, _extends({
          page: i,
          status: page >= i ? 'complete' : 'not-started'
        }, child.props));
      }))
    }, /*#__PURE__*/React.createElement("div", {
      className: "wfp--form-long"
    }, activePage)), /*#__PURE__*/React.createElement(FormSpy, {
      subscription: {
        active: true,
        values: true
      },
      component: handleValidation
    }));
  });
};

export { Wizard, Page }; // static propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };