/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          component: () => import('./views/Home.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', active: true },
            ],
            pageTitle: 'Dashboard',
          },
        },
        {
          path: '/members/create',
          component: () => import('./views/members/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Add Member', active: true },
            ],
            pageTitle: 'Add Member',
          },
        },
        {
          path: '/members/manage',
          component: () => import('./views/members/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Manage Members', active: true },
            ],
            pageTitle: 'Manage Members',
          },
        },
        {
          path: '/members/verify-members',
          component: () => import('./views/members/VerifyMembers.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Verify Member', active: true },
            ],
            pageTitle: 'Verify Member',
          },
        },
        {
          path: '/sermon/create',
          component: () => import('./views/mobile-app-controls/sermon/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Create Sermon', active: true },
            ],
            pageTitle: 'Create Sermon',
          },
        },
        {
          path: '/sermon/manage',
          component: () => import('./views/mobile-app-controls/sermon/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Sermons', active: true },
            ],
            pageTitle: 'Manage Sermons',
          },
        },
        {
          path: '/groups/create',
          component: () => import('./views/mobile-app-controls/groups/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Create Group', active: true },
            ],
            pageTitle: 'Create Group',
          },
        },
        {
          path: '/groups/manage',
          component: () => import('./views/mobile-app-controls/groups/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Groups', active: true },
            ],
            pageTitle: 'Manage Groups',
          },
        },
        {
          path: '/news/create',
          component: () => import('./views/mobile-app-controls/news/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Add News', active: true },
            ],
            pageTitle: 'Add News',
          },
        },
        {
          path: '/news/manage',
          component: () => import('./views/mobile-app-controls/news/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage News', active: true },
            ],
            pageTitle: 'Manage News',
          },
        },
        {
          path: '/pastors/create',
          component: () => import('./views/mobile-app-controls/pastors/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Add Pastor', active: true },
            ],
            pageTitle: 'Add Pastor',
          },
        },
        {
          path: '/pastors/manage',
          component: () => import('./views/mobile-app-controls/pastors/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Pastors', active: true },
            ],
            pageTitle: 'Manage Pastors',
          },
        },
        {
          path: '/payment/create',
          component: () => import('./views/mobile-app-controls/payment/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Add Payment', active: true },
            ],
            pageTitle: 'Add Payment',
          },
        },
        {
          path: '/payment/manage',
          component: () => import('./views/mobile-app-controls/payment/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Payments', active: true },
            ],
            pageTitle: 'Manage Payments',
          },
        },
        {
          path: '/about/create',
          component: () => import('./views/mobile-app-controls/about/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'About Us', active: true },
            ],
            pageTitle: 'About Us',
          },
        },
        {
          path: '/about/manage',
          component: () => import('./views/mobile-app-controls/about/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage About Us', active: true },
            ],
            pageTitle: 'Manage About Us',
          },
        },
        {
          path: '/branch/create',
          component: () => import('./views/mobile-app-controls/branch/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Add New Branch', active: true },
            ],
            pageTitle: 'Add New Branch',
          },
        },
        {
          path: '/branch/manage',
          component: () => import('./views/mobile-app-controls/branch/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Branches', active: true },
            ],
            pageTitle: 'Manage Branches',
          },
        },
        {
          path: '/devotionals/create',
          component: () => import('./views/mobile-app-controls/devotionals/Create.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Add Devotional', active: true },
            ],
            pageTitle: 'Add Devotional',
          },
        },
        {
          path: '/devotionals/manage',
          component: () => import('./views/mobile-app-controls/devotionals/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Manage Devotionals', active: true },
            ],
            pageTitle: 'Manage Devotionals',
          },
        },
        {
          path: '/live/manage',
          component: () => import('./views/mobile-app-controls/live/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Mobile App Controls' },
              { title: 'Live Links', active: true },
            ],
            pageTitle: 'Live Links',
          },
        },
        {
          path: '/first-timers/add',
          component: () => import('./views/first-timer/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'First Timer' },
              { title: 'Add First Timer', active: true },
            ],
            pageTitle: 'Add First Timer',
          },
        },
        {
          path: '/first-timers/manage',
          component: () => import('./views/first-timer/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'First Timer' },
              { title: 'Manage First Timers', active: true },
            ],
            pageTitle: 'Manage First Timers',
          },
        },
        {
          path: '/events/add',
          component: () => import('./views/events/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Events' },
              { title: 'Add Event', active: true },
            ],
            pageTitle: 'Add Event',
          },
        },
        {
          path: '/events/manage',
          component: () => import('./views/events/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Events' },
              { title: 'Manage Events', active: true },
            ],
            pageTitle: 'Manage Events',
          },
        },
        {
          path: '/members/add-family',
          component: () => import('./views/family-tree/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Members' },
              { title: 'Add Family', active: true },
            ],
            pageTitle: 'Add Family',
          },
        },
        {
          path: '/members/view-families',
          component: () => import('./views/family-tree/View.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Members' },
              { title: 'All Families', active: true },
            ],
            pageTitle: 'All Families',
          },
        },
        {
          path: '/follow-up/add',
          component: () => import('./views/follow-up/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Follow Ups' },
              { title: 'Add Follow up', active: true },
            ],
            pageTitle: 'Add Follow up',
          },
        },
        {
          path: '/follow-up/manage',
          component: () => import('./views/follow-up/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Follow Ups' },
              { title: 'Manage Follow ups', active: true },
            ],
            pageTitle: 'Manage Follow ups',
          },
        },
        {
          path: '/follow-up/followup-categories',
          component: () => import('./views/follow-up/NewCategory.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Follow Ups' },
              { title: 'Follow up Categories', active: true },
            ],
            pageTitle: 'Follow up Categories',
          },
        },
        {
          path: '/follow-up/my-follow-ups',
          component: () => import('./views/follow-up/MyFollowups.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Follow Ups' },
              { title: 'My Follow ups', active: true },
            ],
            pageTitle: 'My Follow ups',
          },
        },
        {
          path: '/staff/add',
          component: () => import('./views/staff/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Staff' },
              { title: 'Add Staff', active: true },
            ],
            pageTitle: 'Add Staff',
          },
        },
        {
          path: '/staff/manage',
          component: () => import('./views/staff/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Staff' },
              { title: 'Manage Staff', active: true },
            ],
            pageTitle: 'Manage Staff',
          },
        },
        {
          path: '/payroll/add',
          component: () => import('./views/payroll/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Payroll' },
              { title: 'Add Payroll', active: true },
            ],
            pageTitle: 'Add Payroll',
          },
        },
        {
          path: '/payroll/manage',
          component: () => import('./views/payroll/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Payroll' },
              { title: 'Manage Payrolls', active: true },
            ],
            pageTitle: 'Manage Payrolls',
          },
        },
        {
          path: '/expenses/add',
          component: () => import('./views/expenses/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Expenses' },
              { title: 'Add Expenses', active: true },
            ],
            pageTitle: 'Add Expenses',
          },
        },
        {
          path: '/expenses/manage',
          component: () => import('./views/expenses/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Expenses' },
              { title: 'Manage Expenses', active: true },
            ],
            pageTitle: 'Manage Expenses',
          },
        },
        {
          path: '/expenses/categories',
          component: () => import('./views/expenses/AllCategories.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Expenses' },
              { title: 'Expense Categories', active: true },
            ],
            pageTitle: 'Expense Categories',
          },
        },
        {
          path: '/expenses/new-category',
          component: () => import('./views/expenses/NewCategory.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Expenses' },
              { title: 'New Expense Category', active: true },
            ],
            pageTitle: 'New Expense Category',
          },
        },
        {
          path: '/online-payment/add',
          component: () => import('./views/contribution/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Online Payment' },
              { title: 'Add Online Payment', active: true },
            ],
            pageTitle: 'Add Online Payment',
          },
        },
        {
          path: '/online-payment/manage',
          component: () => import('./views/contribution/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Online Payment' },
              { title: 'Manage Online Payments', active: true },
            ],
            pageTitle: 'Manage Online Payments',
          },
        },
        {
          path: '/online-payment/types',
          component: () => import('./views/contribution/ContributionType.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Online Payment' },
              { title: 'Online Payment Types', active: true },
            ],
            pageTitle: 'Online Payment Types',
          },
        },
        {
          path: '/online-payment/new-type',
          component: () => import('./views/contribution/NewType.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Online Payment' },
              { title: 'New Online Payment Type', active: true },
            ],
            pageTitle: 'New Online Payment Type',
          },
        },
        {
          path: '/income/add',
          component: () => import('./views/other-income/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Incomes' },
              { title: 'Add Income', active: true },
            ],
            pageTitle: 'Add Income',
          },
        },
        {
          path: '/income/manage',
          component: () => import('./views/other-income/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Incomes' },
              { title: 'Manage Income', active: true },
            ],
            pageTitle: 'Manage Income',
          },
        },
        {
          path: '/reports/cash-flow',
          component: () => import('./views/reports/CashFlow.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Reports' },
              { title: 'Cash Flow', active: true },
            ],
            pageTitle: 'Cash Flow',
          },
        },
        {
          path: '/reports/financials',
          component: () => import('./views/reports/Financials.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Reports' },
              { title: 'Financials Charts', active: true },
            ],
            pageTitle: 'Financials Charts',
          },
        },
        {
          path: '/income/categories',
          component: () => import('./views/other-income/AllCategories.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Incomes' },
              { title: 'Income Categories', active: true },
            ],
            pageTitle: 'Income Categories',
          },
        },
        {
          path: '/income/new-category',
          component: () => import('./views/other-income/NewCategory.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Incomes' },
              { title: 'New Income Category', active: true },
            ],
            pageTitle: 'New Income Category',
          },
        },
        {
          path: '/communication/emails',
          component: () => import('./views/communication/SentEmails.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'Sent Emails', active: true },
            ],
            pageTitle: 'Sent Emails',
          },
        },
        {
          path: '/communication/sms',
          component: () => import('./views/communication/SentSms.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'Sent SMS', active: true },
            ],
            pageTitle: 'Sent SMS',
          },
        },
        {
          path: '/communication/new-sms',
          component: () => import('./views/communication/NewSms.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'New SMS', active: true },
            ],
            pageTitle: 'New SMS',
          },
        },
        {
          path: '/communication/new-email',
          component: () => import('./views/communication/NewEmail.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'New Email', active: true },
            ],
            pageTitle: 'New Email',
          },
        },
        {
          path: '/communication/template',
          component: () => import('./views/communication/Template.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'Template', active: true },
            ],
            pageTitle: 'Template',
          },
        },
        {
          path: '/communication/send-notification',
          component: () => import('./views/communication/SendNotification.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Communication' },
              { title: 'Send Notification', active: true },
            ],
            pageTitle: 'Send Notification',
          },
        },
        {
          path: '/attendance-report/add',
          component: () => import('./views/attendance-report/Add.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Attendance' },
              { title: 'Add Attendance', active: true },
            ],
            pageTitle: 'Add Attendance',
          },
        },
        {
          path: '/attendance-report/manage',
          component: () => import('./views/attendance-report/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Attendance' },
              { title: 'Manage Attendance', active: true },
            ],
            pageTitle: 'Manage Attendance',
          },
        },
        {
          path: '/attendance-report/checkin',
          component: () => import('./views/attendance-report/checkin.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Attendance' },
              { title: 'Attendance Check-In', active: true },
            ],
            pageTitle: 'Attendance Check-In',
          },
        },
        {
          path: '/users/manage',
          component: () => import('./views/users/Manage.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Users' },
              { title: 'Manage Roles', active: true },
            ],
            pageTitle: 'Manage Roles',
          },
        },
        {
          path: '/settings',
          component: () => import('./views/Settings.vue'),
          meta: {
            requiresAuth: true,
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Settings', active: true },
            ],
            pageTitle: 'Settings',
          },
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            requiresAuth: false
          },
        },
        {
          path: '/forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            requiresAuth: false
          },
        },
        {
          path: '/pages/error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            requiresAuth: false
          },
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !loggedIn) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath || '/'
      },
    })
  }
  return next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
