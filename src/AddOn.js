import PropTypes from 'prop-types'
import {
  DEFAULT_STUB_NAME,
  ADD_ON_DN
} from './constant'

const AddOn = () => null

AddOn.propTypes = { name: PropTypes.string }
AddOn.defaultTypes = { name: DEFAULT_STUB_NAME }
AddOn.displayName = ADD_ON_DN

export default AddOn
