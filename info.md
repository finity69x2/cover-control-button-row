Button row for controlling open/close covers in Home Assistant. This plugin will also accept a "cover group" as the entity_id.

This element is completely theme-able to provide a match to the other control rows to provide a consistent look for the different elements in your Lovelace frontend
<b>Configuration Examples:</b>
    
  ```
    cards:
      - type: entities
        title: cover theme test
        show_header_toggle: false
        state_color: true
        entities:
          - type: custom:cover-position-preset-row
            name: Blind Custom Position
            entity: cover.blinds_test
            reverseButtons: true
            ## used to select your own customizable theme
            customTheme: true
            stopButtonColor: 'orange'
            buttonInactiveColor: 'gray'
            isOpenedColor: 'pink'
            isClosedColor: 'magenta'
            ## used to select custom text for the buttons
            customOpenText: 'OPEN'
            customStopText: 'STOP'
            customCloseText: 'CLOSE'
  ```

This is with the default Lovelace frontend theme set:

![Default](cover_default.gif)

This is with the "Slate" frontend theme set:

![Slate](cover_default_slate.gif)

This is with a custom theme and custom text:

![Custom Theme and Text](cover_themed_text_slate.gif)
