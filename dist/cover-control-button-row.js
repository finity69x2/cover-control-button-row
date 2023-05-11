window.customCards = window.customCards || [];
window.customCards.push({
  type: "cover-control-button-row",
  name: "cover control button row",
  description: "A plugin to display your cover controls in a button row.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class CustomCoverControlRow extends LitElement {


	constructor() {
		super();
		this._config = {
			customTheme: false,
			reverseButtons: false,
			hideStopButton: false,
			allowDisablingButtons: true,
			width: '41px',
			height: '30px',
			stopButtonColor: '#c94444',
			buttonInactiveColor: '#759aaa',
			isOpenColor: '#f44c09',
			isClosedColor: '#43A047',
			customOpenText: 'OPN',
			customStopText: 'STP',
			customCloseText: 'CLS',
		};
	}

	static get properties() {
		return {
			hass: Object,
			_config: Object,
				_stateObj: Object,
				_width: String,
				_height: String,
				_leftColor: String,
				_stopColor: String,
				_rightColor: String,
				_leftText: String,
				_stopText: String,
				_rightText: String,
				_leftName: String,
				_stopName: String,
				_rightName: String,
				_leftPosition: Boolean,
				_rightPosition: Boolean,
				_hideStop: Boolean,
		};
	}

	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.box {
				display: flex;
				flex-direction: row;
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
				float: left !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}
	
	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='box'>
					<button
						class='position'
						style='${this._leftColor};min-width:${this._width};max-width:${this._width};height:${this._height}'
						toggles name="${this._leftName}"
						@click=${this.setPosition}
						.disabled=${this._leftPosition}>${this._leftText}</button>
					<button
						class='position'
						style='${this._stopColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideStop}'
						toggles name="${this._stopName}"
						@click=${this.setPosition}>${this._stopText}</button>
					<button
						class='position'
						style='${this._rightColor};min-width:${this._width};max-width:${this._width};height:${this._height}'
						toggles name="${this._rightName}"
						@click=${this.setPosition}
						.disabled=${this._rightPosition}>${this._rightText}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}
	
	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

	setConfig(config) {
		this._config = { ...this._config, ...config };
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}
	
	hassChanged(hass) {

		const config = this._config;
		const stateObj = this.hass.states[config.entity];
		const custTheme = config.customTheme;
		const revButtons = config.reverseButtons;
		const hideStpBtn = config.hideStopButton;
		const allowDisable = config.allowDisablingButtons;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const stpButtonClr = config.stopButtonColor;
		const disabledButtonClr = config.buttonInactiveColor;
		const isOpenedClr = config.isOpenColor;
		const isClosedClr = config.isClosedColor;
		const opnTxt = config.customOpenText;
		const stpTxt = config.customStopText;
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
				
		if (custTheme) {
			if (opened == 'on') {
				stopbtncolor = 'background-color:' + stpButtonClr;
				opnbtncolor = 'background-color:' + isOpenedClr; //clsButtonClr;
				clsbtncolor = 'background-color:' + disabledButtonClr;
			} else {
				stopbtncolor = 'background-color:' + stpButtonClr;
				opnbtncolor = 'background-color:' + disabledButtonClr;
				clsbtncolor = 'background-color:' + isClosedClr; //opnButtonClr;
			}
		} else {
			if (opened == 'on') {
				stopbtncolor = 'background-color: red';
				opnbtncolor = 'background-color: var(--primary-color)';
				clsbtncolor = 'background-color: var(--disabled-text-color)';
			} else if (closed == 'on') {
				stopbtncolor = 'background-color: red';
				opnbtncolor = 'background-color: var(--disabled-text-color)';
				clsbtncolor = 'background-color: var(--primary-color)';
			}
		}


		let opentext = opnTxt;
		let stoptext = stpTxt;
		let closetext = clsTxt;
		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let openname = 'open';
		let stopname = 'stop';
		let closename = 'close';
		
		let hidestop = 'display:block';
	
		if (hideStpBtn) {
			hidestop = 'display:none';
		} else {
			hidestop = 'display:block';
		}
		

		if (revButtons) {
			this._stateObj = stateObj;
			this._leftPosition = (opened == 'on' && allowDisable);
			this._rightPosition = (closed == 'on' && allowDisable);
			this._width = buttonwidth;
			this._height = buttonheight;
			this._leftColor = opnbtncolor;
			this._stopColor = stopbtncolor;
			this._rightColor = clsbtncolor;
			this._leftText = opentext;
			this._stopText = stoptext;
			this._rightText = closetext;
			this._leftName = openname;
			this._stopName = stopname;
			this._rightName = closename;
			this._hideStop = hidestop;
		} else {
			this._stateObj = stateObj;
			this._leftPosition = (closed == 'on' && allowDisable);
			this._rightPosition = (opened == 'on'  && allowDisable);
			this._width = buttonwidth;
			this._height = buttonheight;
			this._leftColor = clsbtncolor;
			this._stopColor = stopbtncolor;
			this._rightColor = opnbtncolor;
			this._leftText = closetext;
			this._stopText = stoptext;
			this._rightText = opentext;
			this._leftName = closename;
			this._stopName = stopname;
			this._rightName = openname;
			this._hideStop = hidestop;
		}
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
