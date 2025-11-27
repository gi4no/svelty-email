import { defaultTheme } from '@sveltepress/theme-default';
import Icons from 'unplugin-icons/vite';
import { sveltepress } from '@sveltepress/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		// tailwindcss(),
		sveltepress({
			siteConfig: {
				title: 'Svelt𝑦-Email',
				description: 'Community fork for Svelte-Email'
			},
			theme: defaultTheme({
				github: 'test',
				navbar: [
					{ title: 'Docs', to: '/docs' },
					{ title: 'Examples', to: '/docs/examples/airbnb-review' }
				],
				sidebar: {
					'/': [
						{
							title: 'Overview',
							items: [
								{
									title: 'Svelte Email',
									to: '/docs/overview/svelte-email/'
								}
							]
						},
						{
							title: 'Getting Started',
							items: [
								{
									title: 'Installation',
									to: '/docs/getting-started/installation/'
								},
								{
									title: 'Usage',
									to: '/docs/getting-started/usage/'
								}
							]
						},
						{
							title: 'Components',
							items: [
								{
									title: 'HTML',
									to: '/docs/components/HTML/'
								},
								{
									title: 'Head',
									to: '/docs/components/head/'
								},
								{
									title: 'Button',
									to: '/docs/components/button/'
								},
								{
									title: 'Container',
									to: '/docs/components/container/'
								},
								{
									title: 'Column',
									to: '/docs/components/column/'
								},
								{
									title: 'Section',
									to: '/docs/components/section/'
								},
								{
									title: 'Heading',
									to: '/docs/components/heading/'
								},
								{
									title: 'Hr',
									to: '/docs/components/hr/'
								},
								{
									title: 'Image',
									to: '/docs/components/image/'
								},
								{
									title: 'Link',
									to: '/docs/components/link/'
								},
								{
									title: 'Preview',
									to: '/docs/components/preview/'
								},
								{
									title: 'Text',
									to: '/docs/components/text/'
								}
							]
						},
						{
							title: 'Utilities',
							items: [
								{
									title: 'Render',
									to: '/docs/utilities/render/'
								}
							]
						},
						{
							title: 'Integrations',
							items: [
								{
									title: 'Overview',
									to: '/docs/integrations/overview/'
								},
								{
									title: 'Send email using Nodemailer',
									to: '/docs/integrations/nodemailer/'
								},
								{
									title: 'Send email using SendGrid',
									to: '/docs/integrations/sendgrid/'
								},
								{
									title: 'Send email using Postmark',
									to: '/docs/integrations/postmark/'
								},
								{
									title: 'Send email using AWS SES',
									to: '/docs/integrations/aws-ses/'
								}
							]
						},
						{
							title: 'Examples',
							items: [
								{
									title: 'Airbnb Review Notification',
									to: '/docs/examples/airbnb-review/'
								},
								{
									title: 'Apple Receipt',
									to: '/docs/examples/apple-receipt/'
								}
							]
						}
					]
				}
			})
		}),
		Icons({
			compiler: 'svelte'
		})
	]
};

export default config;
