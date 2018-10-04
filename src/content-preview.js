// @flow
import * as React from 'react'
import store from 'store'

import './content-preview.css'

type Props = {
	linkTo: Function,
	previewContainer: Function,
	loader: Function,
	url: string,
	proxy: string,
	errorMessage: string,
	useCached: bool
}

type State = {
	previewImg: string,
	loading: bool,
	error: bool,
	cache: Object
}

class ContentPreview extends React.Component<Props, State> {
	state = {
		previewImg: '',
		loading: false,
		error: false,
		cache: {}
	}

	componentDidMount() {
		store.set('previewstore', [])
	}

	fetchPreview() {
		const { url, proxy, useCached } = this.props
		const { cache } = this.state
		const proxyUrl = !!proxy ? proxy : 'https://cors-anywhere.herokuapp.com/'
		const apiUrl = `http://api.screenshotlayer.com/api/capture
		?access_key=d5ec05f4c29e59b41644cc0d4b71cb96
		&url=${url}`
		this.setState({ loading: true })
		if (useCached && cache) {
			return async (resolve: Function) => resolve(cache.image)
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

	getPreview = (event: SyntheticEvent<HTMLAnchorElement>) => {
		console.log(this.fetchPreview())
		this.fetchPreview()
			.then((response) => {
				console.log(response)
				this.setState({ previewImg: URL.createObjectURL(response) })
			})
			.catch((error) => {
				this.setState({ error: true })
			})
			.finally(() => this.setState({ loading: false }))
	}

	cleanPreview = (event: SyntheticEvent<HTMLAnchorElement>) => {
		this.setState({ previewImg: '' })
	}

	render() {
		return(
			<React.Fragment>
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
			</React.Fragment>
		)
	}
}

export default ContentPreview
