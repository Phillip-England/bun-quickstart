import type { ReactNode } from "react"
import ReactDOMServer from "react-dom/server"


type BaseTemplateProps = {
	title: string
	children: ReactNode

}

export function BaseTemplate({title, children}: BaseTemplateProps): JSX.Element {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="/static/css/output.css" />
				<title>{title}</title>
			</head>
			<body>
				{children}
			</body>
		</html>
	)
}

export function HomeTemplate(): JSX.Element {
	return (
		<BaseTemplate title="Home">
			<h1>Hello World</h1>
		</BaseTemplate>
	)
}