import type { ReactNode } from "react"


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
                <script src="https://unpkg.com/htmx.org@2.0.0"></script>
				<link rel="stylesheet" href="/static/css/output.css" />
				<title>{title + " - CFA Suite"}</title>
			</head>
			<body hx-boost='true'>
				{children}
			</body>
		</html>
	)
}