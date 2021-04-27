class CustomCoverControlRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
				}
				.position {
					margin-left: 2px;
					margin-right: 2px;
					background-color: #759aaa;
					border: 1px solid lightgrey; 
					border-radius: 4px;
					font-size: 10px !important;
					color: inherit;
					text-align: center;
					float: right !important;
					padding: 1px;
					cursor: pointer;
				}
				
				</style>
					<hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
						<div class='horizontal justified layout' on-click="stopPropagation">
						<button
							class='position'
							style='[[_leftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideLeft]]'
							toggles name="[[_leftName]]"
							on-click='setPosition'
							disabled='[[_leftPosition]]'>[[_leftText]]</button>
						<button
							class='position'
							style='[[_stopColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideStop]]'
							toggles name="[[_stopName]]"
							on-click='setPosition'>[[_stopText]]</button>
						<button
							class='position'
							style='[[_rightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideRight]]'
							toggles name="[[_rightName]]"
							on-click='setPosition'
							disabled='[[_rightPosition]]'>[[_rightText]]</button>
						</div>
					</hui-generic-entity-row>
		`;
    }
/*
						<button
							class='position'
							style='[[_midLeftColor]]'
							on-click='setPosition'
							disabled=true>[[_midLeftText]]</button>

						<button
							class='position'
							style='[[_midRightColor]]'
							on-click='setPosition'
							disabled=true>[[_midRightText]]</button>
*/

    static get properties() {
		return {
			hass: {
				type: Object,
				observer: 'hassChanged'
			},
				_config: Object,
				_stateObj: Object,
				_width: String,
				_height: String,
				_leftColor: String,
				//_midLeftColor: String,
				_stopColor: String,
				//_midRightColor: String,
				_rightColor: String,
				_leftText: String,
				//_midLeftText: String,
				_stopText: String,
				//_midRightText: String,
				_rightText: String,
				_leftName: String,
				_stopName: String,
				_rightName: String,
				_leftPosition: Boolean,
				_rightPosition: Boolean,
				_hideStop: Boolean,
				_hideClose: Boolean,
		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			reverseButtons: false,
			hideStopButton: false,
			hideCloseButton: false,
			width: '41px',
			height: '30px',
			//openButtonColor: '#43A047',
			stopButtonColor: '#c94444',
			//closeButtonColor: '#f44c09',
			buttonInactiveColor: '#759aaa',
			isOpenColor: '#f44c09',
			isClosedColor: '#43A047',
			//notInPositionColor: 'gray',
			customOpenText: 'OPN',
			//customOpenedText: 'UP',
			customStopText: 'STP',
			//customClosedText: 'DWN',
			customCloseText: 'CLS',
			...config
		};
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = hass.states[config.entity];
		const custTheme = config.customTheme;
		const revButtons = config.reverseButtons;
		const hideStpBtn = config.hideStopButton;
		const hideClsBtn = config.hideCloseButton;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		//const opnButtonClr = config.openButtonColor;
		const stpButtonClr = config.stopButtonColor;
		//const clsButtonClr = config.closeButtonColor;
		const disabledButtonClr = config.buttonInactiveColor;
		const isOpenedClr = config.isOpenColor;
		const isClosedClr = config.isClosedColor;
		//const notInPositionClr = config.notInPositionColor;
		const opnTxt = config.customOpenText;
		//const isOpenTxt = config.customOpenedText;
		const stpTxt = config.customStopText;
		//const isClosedTxt = config.customClosedText;
		const clsTxt = config.customCloseText;
						
				
		let opened;
		let closed;
				
		if (stateObj && stateObj.attributes) {
			if (stateObj.state == 'open' ) {
				opened = 'on';
			} else {
				closed = 'on';
			}	
		}
			
		let opnbtncolor;
		let clsbtncolor;
		let stopbtncolor;
		//let openedcolor;
		//let closedcolor;
				
		if (custTheme) {
			if (opened == 'on') {
				//openedcolor = 'background-color:' + isOpenedClr;
				//closedcolor = 'background-color:' + notInPositionClr;
				stopbtncolor = 'background-color:' + stpButtonClr;
				opnbtncolor = 'background-color:' + isOpenedClr; //clsButtonClr;
				clsbtncolor = 'background-color:' + disabledButtonClr;
			} else {
				//openedcolor = 'background-color:' + notInPositionClr;
				//closedcolor = 'background-color:' + isClosedClr;
				stopbtncolor = 'background-color:' + stpButtonClr;
				opnbtncolor = 'background-color:' + disabledButtonClr;
				clsbtncolor = 'background-color:' + isClosedClr; //opnButtonClr;
			}
		} else {
			if (opened == 'on') {
				//openedcolor = 'background-color: red';
				//closedcolor = 'background-color: var(--switch-unchecked-color)';
				stopbtncolor = 'background-color: red';
				opnbtncolor = 'background-color: var(--primary-color)';
				clsbtncolor = 'background-color: var(--disabled-text-color)';
			} else if (closed == 'on') {
				//openedcolor = 'background-color: var(--switch-unchecked-color)';
				//closedcolor = 'background-color: #17e837';
				stopbtncolor = 'background-color: red';
				opnbtncolor = 'background-color: var(--disabled-text-color)';
				clsbtncolor = 'background-color: var(--primary-color)';
			}
		}


		let opentext = opnTxt;
		let stoptext = stpTxt;
		let closetext = clsTxt;
		//let isopentext = isOpenTxt;
		//let isclosedtext = isClosedTxt;
		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let openname = 'open';
		let stopname = 'stop';
		let closename = 'close';
		
		let hidestop = 'display:block';
		let hideclose = 'display:block';
	
		if (hideStpBtn) {
			hidestop = 'display:none';
		} else {
			hidestop = 'display:block';
		}
		
		if (hideClsBtn) {
			hideclose = 'display:none';
		} else {
			hideclose = 'display:block';
		}

		if (revButtons) {
			this.setProperties({
				_stateObj: stateObj,
				_leftPosition: opened == 'on',
				_rightPosition: closed == 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: opnbtncolor,
				//_midLeftColor: openedcolor,
				_stopColor: stopbtncolor,
				//_midRightColor: closedcolor,
				_rightColor: clsbtncolor,
				_leftText: opentext,
				//_midLeftText: isopentext,
				_stopText: stoptext,
				//_midRightText: isclosedtext,
				_rightText: closetext,
				_leftName: openname,
				_stopName: stopname,
				_rightName: closename,
				_hideStop: hidestop,
				_hideRight: hideclose,
				_hideLeft: 'display:block',
			});
		} else {
			this.setProperties({
				_stateObj: stateObj,
				_leftPosition: closed == 'on',
				_rightPosition: opened == 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: clsbtncolor,
				//_midLeftColor: closedcolor,
				_stopColor: stopbtncolor,
				//_midRightColor: openedcolor,
				_rightColor: opnbtncolor,
				_leftText: closetext,
				//_midLeftText: isclosedtext,
				_stopText: stoptext,
				//_midRightText: isopentext,
				_rightText: opentext,
				_leftName: closename,
				_stopName: stopname,
				_rightName: openname,
				_hideStop: hidestop,
				_hideLeft: hideclose,
				_hideRight: 'display:block',
			});
		}
	}

	
	stopPropagation(e) {
		e.stopPropagation();
	}
	
	setPosition(e) {
		const position = e.currentTarget.getAttribute('name');
		if( position == 'open' ){
			this.hass.callService('cover', 'open_cover', {entity_id: this._config.entity});
		} else if (position == 'stop') {
			this.hass.callService('cover', 'stop_cover', {entity_id: this._config.entity});
		} else if (position == 'close') {
			this.hass.callService('cover', 'close_cover', {entity_id: this._config.entity});
		}
	}
}
	
customElements.define('cover-control-button-row', CustomCoverControlRow);
