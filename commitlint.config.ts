import type { UserConfig } from "@commitlint/types"

const Configuration: UserConfig = {
	formatter: "@commitlint/format",
	rules: {
		"header-min-length": [2, "always", 15],
		"header-end-period": [2, "always"]
	},
	plugins: [
		{
			rules: {
				// @ts-ignore
				"header-end-period": ({ header }: { header: string }) => {
					return [/\.$/.test(header), "Commit message must end with a period"]
				}
			}
		}
	]
}

export default Configuration
