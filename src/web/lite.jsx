import 'babel-polyfill'
import React from 'expose-loader?React!react'
import ReactDOM from 'expose-loader?ReactDOM!react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

import store from './store'
import { fetchModules } from './actions'
import InjectedModuleView from '~/components/PluginInjectionSite/module'
import { parseQueryString } from './util'
import { moduleViewNames } from './util/Modules'

const { m, v } = parseQueryString((window.location.search || '').substring(1))

class LiteView extends React.Component {
  componentDidMount() {
    this.props.fetchModules()
  }

  render() {
    const modules = moduleViewNames(this.props.modules.filter(module => module.isPlugin))
    const onNotFound = () => (
      <h1>
        Module ${m} with view ${v} not found
      </h1>
    )

    return (
      <div>
        <InjectedModuleView moduleName={m} viewName={v} lite={true} onNotFound={onNotFound} />
        {modules.map(({ moduleName, viewName }, i) => (
          <InjectedModuleView key={i} moduleName={moduleName} viewName={viewName} onNotFound={onNotFound} />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = { fetchModules }
const mapStateToProps = state => ({ modules: state.modules })
const LiteViewConnected = connect(mapStateToProps, mapDispatchToProps)(LiteView)

ReactDOM.render(
  <Provider store={store}>
    <LiteViewConnected />
  </Provider>,
  document.getElementById('app')
)
