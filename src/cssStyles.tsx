/**
 * This file contains general css stylings
 */
import { css, Global, keyframes } from '@emotion/react'
import React from "react";
import emotionNormalize from 'emotion-normalize';
import { checkFlexGapSupport } from './util/utilityFunctions';
import { createTheme } from '@mui/material/styles';
import { Theme, useTheme } from './themes';

/**
 * An emotion component that inserts styles globally
 * Is removed when the styles change or when the Global component unmounts.
 */
export const GlobalStyle: React.FC = () => {
  const theme = useTheme();
  return (
    <Global styles={globalStyle(theme)} />
  );
}

/**
 * CSS for the global style component
 */
export const globalStyle = (theme: Theme) => css({
  emotionNormalize,
  body: {
    backgroundColor: `${theme.background}`,
    color: `${theme.text}`,
    fontSize: 'medium',
    // Makes the body span to the bottom of the page
    minHeight: "100vh",
  },
});


// When to switch behaviour based on screen width
export const BREAKPOINT_SMALL = 450;
export const BREAKPOINT_MEDIUM = 650;


/**
 * CSS for replacing flexbox gap in browers that do not support it
 * Does not return a css prop, but is meant as a direct replacement for "gap"
 * Example: ...(flexGapReplacementStyle(30, false))
 */
export const flexGapReplacementStyle = (flexGapValue: number, flexDirectionIsRow: boolean) => {

  const half = flexGapValue / 2
  const quarter = flexGapValue / 4

  return (
    {
    // Use gap if supported
      ...(checkFlexGapSupport()) && {gap: `${flexGapValue}px`},
      // Else use margins
      ...(!checkFlexGapSupport()) &&
      {
        ">*": { // For each child
          marginTop: `${quarter}px`,
          marginBottom: `${quarter}px`,
          marginRight: `${half}px`,
          marginLeft: `${half}px`,
        },
        ...(flexDirectionIsRow) && {
          ">*:first-of-type": {
            marginLeft: '0px',
          },
          ">*:last-child": {
            marginRight: '0px',
          },
        },
      }
    }
  );
}

/**
 * CSS for buttons
 */
export const basicButtonStyle = (theme: Theme) => css({
  borderRadius: '5px',
  cursor: "pointer",
  "&:hover": {
    backgroundColor: `${theme.button_color}`,
    color: `${theme.inverted_text}`,
  },
  "&:focus": {
    backgroundColor: `${theme.button_color}`,
    color: `${theme.inverted_text}`,
  },
  // Flex position child elements
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(flexGapReplacementStyle(10, false)),
  textAlign: 'center' as const,
  outline: `${theme.button_outline}`,
});

/**
 * CSS for deactivated buttons
 */
export const deactivatedButtonStyle = css({
  borderRadius: '10px',
  cursor: "pointer",
  opacity: "0.6",
  // Flex position child elements
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(flexGapReplacementStyle(10, false)),
  textAlign: 'center' as const,
});

/**
 * CSS for nagivation styled buttons
 */
export const navigationButtonStyle = (theme: Theme) => css({
  width: '200px',
  padding: '16px',
  justifyContent: 'space-around',
  boxShadow: `${theme.boxShadow}`,
  background: `${theme.element_bg}`,
})

/**
 * CSS for a container that holds back/forward buttons
 */
export const backOrContinueStyle = css(({
  display: 'flex',
  flexDirection: 'row',
  ...(flexGapReplacementStyle(20, false)),
}))

/**
 * CSS for big buttons in a dynamic grid
 */
export const tileButtonStyle = (theme: Theme) => css({
  width: '290px',
  height: '220px',
  display: 'flex',
  flexDirection: 'column',
  fontWeight: "bold",
  ...(flexGapReplacementStyle(30, false)),
  boxShadow: `${theme.boxShadow_tiles}`,
  background: `${theme.element_bg}`,
  placeSelf: 'center',
});

/**
 * CSS for disabling the animation of the basicButtonStyle
 */
export const disableButtonAnimation = css({
  "&:hover": {
    transform: 'none',
  },
  "&:focus": {
    transform: 'none',
  },
  "&:active": {
    transform: 'none',
  },
})

/**
 * CSS for a title
 */
export const titleStyle = (theme: Theme) => css(({
  display: 'inline-block',
  padding: '15px',
  whiteSpace: "nowrap",
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  color: `${theme.text}`,
}))

/**
 * Addendum for the titleStyle
 * Used for page titles
 */
export const titleStyleBold = (theme: Theme) => css({
  fontWeight: 'bold',
  fontSize: '24px',
  verticalAlign: '-2.5px',
  color: `${theme.text}`,
})

/**
 * CSS for ariaLive regions that should not be visible
 */
export const ariaLive = css({
  position: 'absolute',
  left: '-99999px',
  height: '1px',
  width: '1px',
  overflow: 'hidden',
})

/**
 * CSS for displaying of errors
 */
export const errorBoxStyle = (errorStatus: boolean, theme: Theme) => {
  return (
    css({
      ...(!errorStatus) && {display: "none"},
      borderColor: `${theme.error}`,
      borderStyle: 'dashed',
      fontWeight: 'bold',
      padding: '10px',
    })
  );
}

export function selectFieldStyle(theme: Theme) {
  return {
    control: (provided: any, state: any) => ({
      ...provided,
      background: theme.menu_background,
      ...(state.isFocused && {borderColor: theme.metadata_highlight}),
      ...(state.isFocused && {boxShadow: `0 0 0 1px ${theme.metadata_highlight}`}),
      "&:hover": {
        borderColor: theme.menu_background,
        boxShadow: `0 0 0 1px ${theme.metadata_highlight}`
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      background: theme.menu_background,
      outline: theme.dropdown_border,
      // kill the gap
      marginTop: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
    multiValue: (provided: any) => ({
      ...provided,
      color: theme.inverted_text,
      background: theme.multiValue,
      cursor: 'default',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: theme.inverted_text,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused ? theme.focused : theme.menu_background
        && state.isSelected ? theme.selected : theme.menu_background,
      ...(state.isFocused && {color: theme.focus_text}),
      color: state.isFocused ? theme.focus_text : theme.text
        && state.isSelected ? theme.selected_text : theme.text,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: theme.indicator_color,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: theme.indicator_color,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      cursor: "text",
    }),
    input: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
  }
}

export const calendarStyle = (theme: Theme) => createTheme({

  components: {

    MuiPaper: {
      styleOverrides: {
        root: {
          /* Modal */
          outline: `${theme.dropdown_border} !important`,
          background: `${theme.menu_background}`,
          color: `${theme.text}`,

          /* Calendar-modal */
          '.MuiYearPicker-root': {
            '.PrivatePickersYear-yearButton:hover, .Mui-selected:hover': {
              background: `${theme.focused}`,
              color: `${theme.focus_text}`,
            },
            '.Mui-selected': {
              background: `${theme.selected}`,
              color: `${theme.selected_text}`,
            }
          },

          /* Clock-modal */
          '& .MuiClock-clock': { // round clock
            background: `${theme.clock_bg}`,
            outline: `${theme.clock_border}`,
            '-webkitTextFillColor': `${theme.text}`, // Digits on the clock
            textShadow: `${theme.text_shadow}`
          },
          /* selected digit (hour/minute) */
          '& .MuiClockPicker-root .Mui-selected': {
            '-webkitTextFillColor': `${theme.digit_selected}`,
            fontWeight: 'bold',
            textShadow: 'none',
          },
          /* clock hands */
          '& .MuiClock-pin, .MuiClockPointer-root': {
            background: `${theme.clock_hands}`
          },
          '& .MuiClockPointer-thumb': {
            background: `${theme.clock_hands}`,
            border: `16px solid ${theme.clock_hands}`,
          }
        },

      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          /* Calendar- and Clock-modal -> arrows, icon, days  */
          color: `${theme.text} !important`,
          '&.MuiPickersDay-root': {
            background: 'transparent !important',
            color: `${theme.text} !important`,
          },
          '&:hover, &.Mui-selected:hover': {
            background: `${theme.focused} !important`,
            color: `${theme.focus_text} !important`,
          },
          // Selected day
          '&.Mui-selected': {
            background: `${theme.selected} !important`,
            color: `${theme.selected_text} !important`,

          },
          // Current day
          '&:not(.Mui-selected)': {
            borderColor: `${theme.focused} !important`,
          },
          '&.Mui-disabled': {
            color: `${theme.disabled} !important`,
          },
          '&.MuiClock-amButton, &.MuiClock-pmButton': {
            '-webkitTextFillColor': `${theme.text} !important`,
            '&:hover': {
              '-webkitTextFillColor': `${theme.clock_focus} !important`
            }
          },
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: { // Weekdays
          color: `${theme.disabled} !important`,
        },
      }
    },
  }
})

export const subtitleSelectStyle = (theme: Theme) => createTheme({
  components: {
    /* Label: 'Pick a language' & 'Video Flavor' */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: `${theme.text} !important`,
        },
      }
    },
    /* Labelborder */
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `${theme.dropdown_border} !important`,
        },
      }
    },
    /* Selectfield/Inputfield with Icon */
    MuiSelect: {
      styleOverrides: {
        select: {
          background: `${theme.element_bg}`,
          color: `${theme.text} !important`,
        },
        icon: {
          color: `${theme.indicator_color}`,
        },
      }
    },

    /* Dropdownlist */
    MuiMenu: {
      styleOverrides: {
        list: {
          background: `${theme.background}`,
          color: `${theme.text}`,
          border: `${theme.dropdown_border}`,
        },
      }
    },
    /* Dropdownlist: Single entry */
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &.Mui-selected:hover': {
            color: `${theme.focus_text}`,
            background: `${theme.focused}`
          },
          '&.Mui-selected': {
            color: `${theme.selected_text}`,
            background: `${theme.selected}`,
          },
        },
      }
    }
  }
})

export const spinningStyle = css({
  animation: `2s linear infinite none ${keyframes({
    "0%": { transform: "rotate(0)" },
    "100%": { transform: "rotate(360deg)" },
  })}`,
})

export const customIconStyle = (theme: Theme) => css(({
  maxWidth: '16px',
  height: 'auto',
  color: theme.text,
}))

export const videosStyle = (theme: Theme) => css(({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  background: `${theme.menu_background}`,
  borderRadius: '5px',
  boxShadow: `${theme.boxShadow_tiles}`,
  marginTop: '24px',
  boxSizing: "border-box",
  padding: '10px',
  ...(flexGapReplacementStyle(10, false)),
}))

export const backgroundBoxStyle = (theme: Theme) => css(({
  background: `${theme.menu_background}`,
  borderRadius: '7px',
  boxShadow: `${theme.boxShadow_tiles}`,
  boxSizing: "border-box",
  padding: '20px',
  ...(flexGapReplacementStyle(25, false)),
}))
