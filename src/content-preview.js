import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import store from 'store'

import './content-preview.css'

class ContentPreview extends Component {
	state = {
		previewImg: null,
		loading: false,
		error: null,
		cache: null
	}

	constructor(props) {
		super(props)
		this.getPreview = this.getPreview.bind(this)
		this.cleanPreview = this.cleanPreview.bind(this)
	}

	componentDidMount() {
		store.set('previewstore', [])
	}

	fetchPreview() {
		const { url, proxy, useCached } = this.props
		const { cache } = this.state
		const proxyUrl = !!proxy ? proxy : 'https://cors-anywhere.herokuapp.com/'
		const apiUrl = `https://apileap.com/api/screenshot/v1/urltoimage
		?access_key=52ba50eea6264cf0abbda2aad581c8e2
		&url=${url}`
		this.setState({ loading: true })
		if (useCached && cache) {
			return new Promise((resolve) => cache.data)
		} else {
			return fetch(proxyUrl + apiUrl)
				.then(data => data.blob())
				.then((data) => {
					this.setState({
						cache: {
							url,
							image: data
						}
					})
					return data
				})
		}

	}

	getPreview() {
		this.fetchPreview()
			.then((response) => {
				this.setState({ previewImg: URL.createObjectURL(response) })
			})
			.catch((error) => {
				this.setState({ error: true })
			})
			.finally(() => this.setState({ loading: false }))
	}

	cleanPreview() {
		this.setState({ previewImg: null })
	}

	render() {
		return(
			<Fragment>
				{ this.props.linkTo({
					getPreview: this.getPreview,
					cleanPreview: this.cleanPreview,
					url: this.props.url
				}) }

				{ this.props.previewContainer({previewImg: this.state.previewImg}) }
				{
					this.state.loading &&
						this.props.loader({loading: this.state.loading})
				}
				{
					this.state.error &&
						this.props.errorMessage
				}
			</Fragment>
		)
	}
}

ContentPreview.propTypes = {
	linkTo: PropTypes.func,
	previewContainer: PropTypes.func,
	loader: PropTypes.func,
	url: PropTypes.string,
	proxy: PropTypes.string,
	errorMessage: PropTypes.string
}

export default ContentPreview
