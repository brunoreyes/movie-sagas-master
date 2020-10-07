const styles = (theme) => ({
  formControlContainer: { dispaly: 'flex' },
  formControlLeft: {
    // float: 'left',
    marginRight: '16%',
    // marginTop: '1.25%',
    font: '300 120% Roboto, sans-serif',
    color: 'white',
    flex: 1,
  },
  formControl: {
    // margin: '-.2% -11.5% -1% 0%',
    margin: '-.2% -13.5% -1% 0%',
    width: '10%',
    font: '300 160% Roboto, sans-serif',
    // float: 'left',
    flex: 1,
  },
  cssLabel: {
    color: 'white',
    '&.Mui-focused': {
      color: 'white',
    },
    cssOutlinedSelect: {
      '&$cssFocused $notchedOutline': {
        borderColor: `white !important`,
        color: 'white !important',
      },
    },
  },
  notchedOutline: {
    borderWidth: '2px',
    borderColor: 'white !important',
  },
  input: {
    color: 'white',
    '&:focus': {
      backgroundColor: 'transparent',
      color: 'white',
    },
  },
  icon: {
    fill: 'white',
    marginRight: '2%',
  },
  outlined: {
    border: '#fff solid 1.75px',
    '&:hover': {
      border: '#fff solid 1.75px',
    },
    '&:focus': {
      border: '#fff solid 1.75px',
    },
  },
  categorySelector: {
    color: '#fff',
    marginTop: '4%',
    // width: '50px',
    '&:focus': {
      'background-color': { opacity: 0 },
      border: '#fff solid 2px',
      color: '#fff',
    },
  },
});
export default styles;
