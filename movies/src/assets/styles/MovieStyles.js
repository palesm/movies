import {grey} from '@mui/material/colors';

const styles = ( {
  container: {
    paddingBottom: '10px',
    paddingTop: '10px'
  },
  listItemButtons: {
    justifyContent: 'flex-start !important',
    paddingTop: '10px !important',
    paddingBottom: '10px !important',
    fontWeight: 'bold',
    backgroundColor: `${grey[50]} !important`
  },
  gridContainer: {
    paddingTop: '10px',
  },
  buttonContainer: {
    paddingTop: '5px !important'
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: '10px'
  },
  chipContainer: {
    flexWrap: 'wrap'
  },
  chip: {
    marginTop: '1em',
    marginBottom: '1em'
  }
})

export default styles;
