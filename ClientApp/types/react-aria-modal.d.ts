declare module "react-aria-modal" {
    import * as React from "react";
  
    namespace AriaModal{
      export interface IReactAriaModalProps {
        alert?: boolean;
        applicationNode?: HTMLElement;
        dialogCss?: string;
        dialogId?: string;
        dialogStyle?: React.CSSProperties;
        escapeExits?: boolean;
        focusDialog?: boolean;
        focusTrapOptions?: any;
        focusTrapPaused?: boolean;
        getApplicationNode?: Function;
        includeDefaultStyles?: boolean;
        initialFocus?: string;
        mounted?: boolean;
        onEnter?: Function;
        onExit?: Function;
        scrollDisabled?: boolean;
        titleId?: string;
        titleText?: string;
        underlayClass?: string;
        underlayClickExits?: boolean;
        underlayColor?: string | false;
        verticallyCenter?: boolean;
      }
  
    }
  
    class AriaModal extends React.Component<AriaModal.IReactAriaModalProps> {
    }
  
    export = AriaModal;
  }