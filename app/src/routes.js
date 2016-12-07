export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/custom',
    name: 'custom-section',
    component: require('components/CustomSection')
  },
  {
    path: '*',
    redirect: '/'
  }
]
