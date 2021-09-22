/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [{
    url: '/',
    name: 'Home',
    slug: 'home',
    icon: 'HomeIcon',
  },
  {
    url: null,
    name: 'Members',
    slug: 'members',
    icon: 'UsersIcon',
    submenu: [{
        url: '/members/create',
        name: 'Add Member',
        slug: 'add-member',
        i18n: 'Create Member',
      },
      {
        url: '/members/manage',
        name: 'View Members',
        slug: 'manage',
        i18n: 'Manage Members',
      },
      {
        url: '/members/verify-members',
        name: 'Verify Members',
        slug: 'verify',
        i18n: 'Verify Members',
      },
      {
        url: '/members/add-family',
        name: 'Add Family',
        slug: 'add-family-tree',
        i18n: 'Add Family Tree',
      },
      {
        url: '/members/view-families',
        name: 'All Families',
        slug: 'view-family-tree',
        i18n: 'View Family Tree',
      }
    ]
  },
  {
    url: null,
    name: 'Mobile App Controls',
    slug: 'mobile-app-controls',
    icon: 'SmartphoneIcon',
    submenu: [{
        url: null,
        name: 'Sermons',
        slug: 'mobile-app-controls-sermons',
        i18n: 'Sermons',
        icon: 'SpeakerIcon',
        submenu: [{
            url: '/sermon/create',
            name: 'Add New',
            slug: 'add-new',
            i18n: 'Create Sermon',
          },
          {
            url: '/sermon/manage',
            name: 'Manage',
            slug: 'manage',
            i18n: 'Manage Sermons',
          }
        ]
      },
      {
        url: null,
        name: 'Groups',
        slug: 'mobile-app-controls-groups',
        i18n: 'Groups',
        icon: 'UsersIcon',
        submenu: [{
            url: '/groups/create',
            name: 'Add New',
            slug: 'add-new',
            i18n: 'Create Group',
          },
          {
            url: '/groups/manage',
            name: 'Manage',
            slug: 'manage',
            i18n: 'Manage Groups',
          }
        ]
      },
      {
        url: null,
        name: 'News',
        slug: 'mobile-app-controls-news',
        i18n: 'News',
        icon: 'BookIcon',
        submenu: [{
            url: '/news/create',
            name: 'Add New',
            slug: 'add-new',
            i18n: 'Add News',
          },
          {
            url: '/news/manage',
            name: 'Manage',
            slug: 'manage',
            i18n: 'Manage News',
          }
        ]
      },
      {
        url: null,
        name: 'Pastors',
        slug: 'mobile-app-controls-pastors',
        i18n: 'Pastors',
        icon: 'UserIcon',
        submenu: [{
            url: '/pastors/create',
            name: 'Add New',
            slug: 'add-new',
            i18n: 'Add Pastor',
          },
          {
            url: '/pastors/manage',
            name: 'Manage',
            slug: 'manage',
            i18n: 'Manage Pastors',
          }
        ]
      },
      // {
      //   url: null,
      //   name: 'Payment Plans',
      //   slug: 'mobile-app-controls-plans',
      //   i18n: 'Payment Plans',
      //   icon: 'DollarSignIcon',
      //   submenu: [{
      //       url: '/payment/create',
      //       name: 'Add New',
      //       slug: 'add-new',
      //       i18n: 'Add Plan',
      //     },
      //     {
      //       url: '/payment/manage',
      //       name: 'Manage',
      //       slug: 'manage',
      //       i18n: 'Manage Plans',
      //     }
      //   ]
      // },
      {
        url: null,
        name: 'Branch Locator',
        slug: 'mobile-app-controls-about',
        icon: 'GitBranchIcon',
        submenu: [{
            url: '/branch/manage',
            name: 'Manage',
            slug: 'manage-branch',
            i18n: 'Manage branch',
          },
          {
            url: '/branch/create',
            name: 'Add New',
            slug: 'add-branch',
            i18n: 'add branch',
          }
        ]
      },
      {
        url: null,
        name: 'Devotionals',
        slug: 'mobile-app-controls-about',
        icon: 'WatchIcon',
        submenu: [{
            url: '/devotionals/manage',
            name: 'Manage',
            slug: 'manage-devotional',
            i18n: 'Manage devotional',
          },
          {
            url: '/devotionals/create',
            name: 'Add New',
            slug: 'add-devotional',
            i18n: 'add devotional',
          }
        ]
      },
      {
        url: null,
        name: 'Live Streams',
        slug: 'mobile-app-controls-tv',
        icon: 'TvIcon',
        submenu: [{
          url: '/live/manage',
          name: 'Manage',
          slug: 'manage-tv',
          i18n: 'Manage tv',
        }, ]
      },
      {
        url: '/about/manage',
        name: 'About Us',
        slug: 'about-us',
        icon: 'HelpCircleIcon',
      },
    ]
  },
  {
    url: null,
    name: 'Attendance Report',
    slug: 'attendance-report',
    icon: 'BookOpenIcon',
    submenu: [{
        url: '/attendance-report/add',
        name: 'Add New',
        slug: 'add-member',
        i18n: 'Add New',
      },
      {
        url: '/attendance-report/manage',
        name: 'Manage',
        slug: 'manage',
        i18n: 'Manage',
      },
      {
        url: '/attendance-report/checkin',
        name: 'Attendance Check-In',
        slug: 'attendance-checkin',
        i18n: 'Attendance Check-In',
      }
    ]
  },
  {
    url: null,
    name: 'First Timers',
    slug: 'first-timer',
    icon: 'CrosshairIcon',
    submenu: [{
        url: '/first-timers/add',
        name: 'Add New',
        slug: 'add-member',
        i18n: 'Add First Timer',
      },
      {
        url: '/first-timers/manage',
        name: 'Manage',
        slug: 'manage',
        i18n: 'Manage First Timers',
      }
    ]
  },
  {
    url: null,
    name: 'Events',
    slug: 'events',
    icon: 'CalendarIcon',
    submenu: [{
        url: '/events/add',
        name: 'Add Event',
        slug: 'add-event',
        i18n: 'Add Event',
      },
      {
        url: '/events/manage',
        name: 'All Events',
        slug: 'manage',
        i18n: 'All Events',
      }
    ]
  },
  // {
  //   url: null,
  //   name: 'Family Tree',
  //   slug: 'family-tree',
  //   icon: 'DiscIcon',
  //   submenu: [{
  //       url: '/family-tree/add',
  //       name: 'Add Family',
  //       slug: 'add-family-tree',
  //       i18n: 'Add Family Tree',
  //     },
  //     {
  //       url: '/family-tree/view',
  //       name: 'All Families',
  //       slug: 'view-family-tree',
  //       i18n: 'View Family Tree',
  //     }
  //   ]
  // },
  {
    url: null,
    name: 'Follow Ups',
    slug: 'follow-ups',
    icon: 'ShareIcon',
    submenu: [{
        url: '/follow-up/add',
        name: 'Add Follow Up',
        slug: 'add-follow-up',
        i18n: 'Add Follow Up',
      },
      {
        url: '/follow-up/manage',
        name: 'Manage Follow Ups',
        slug: 'manage',
        i18n: 'Manage Follow Ups',
      },
      {
        url: '/follow-up/my-follow-ups',
        name: 'My Follow Ups',
        slug: 'my-follow-ups',
        i18n: 'My Follow Ups',
      },
      {
        url: '/follow-up/followup-categories',
        name: 'Follow Up Categories',
        slug: 'followup-categories',
        i18n: 'Follow Up Categories',
      }
    ]
  },
  {
    url: null,
    name: 'Staff',
    slug: 'staff',
    icon: 'UsersIcon',
    submenu: [{
        url: '/staff/add',
        name: 'Add Staff',
        slug: 'add-staff',
        i18n: 'Add Staff',
      },
      {
        url: '/staff/manage',
        name: 'Manage Staff',
        slug: 'manage',
        i18n: 'Manage Staff',
      }
    ]
  },
  {
    url: null,
    name: 'Payroll',
    slug: 'payroll',
    icon: 'ActivityIcon',
    submenu: [{
        url: '/payroll/add',
        name: 'Add Payroll',
        slug: 'add-payroll',
        i18n: 'Add Payroll',
      },
      {
        url: '/payroll/manage',
        name: 'Manage Payroll',
        slug: 'manage',
        i18n: 'Manage Payroll',
      }
    ]
  },
  {
    url: null,
    name: 'Expenses',
    slug: 'expenses',
    icon: 'DollarSignIcon',
    submenu: [{
        url: '/expenses/add',
        name: 'Add Expense',
        slug: 'add-expenses',
        i18n: 'Add Expense',
      },
      {
        url: '/expenses/manage',
        name: 'View Expenses',
        slug: 'manage',
        i18n: 'Manage Expenses',
      },
      {
        url: '/expenses/categories',
        name: 'Expense Categories',
        slug: 'categories',
        i18n: 'Expense Categories',
      }
    ]
  },
  {
    url: null,
    name: 'Online Payment',
    slug: 'online-payment',
    icon: 'UmbrellaIcon',
    submenu: [{
        url: '/online-payment/add',
        name: 'Add Online Payment',
        slug: 'add-online-payment',
        i18n: 'Add Expense',
      },
      {
        url: '/online-payment/manage',
        name: 'All Online Payments',
        slug: 'manage',
        i18n: 'All Online Payments',
      },
      {
        url: '/online-payment/types',
        name: 'Online Payment Type',
        slug: 'manage',
        i18n: 'Online Payment Type',
      }
    ]
  },
  {
    url: null,
    name: 'Income',
    slug: 'other-income',
    icon: 'TargetIcon',
    submenu: [{
        url: '/income/add',
        name: 'Add Income',
        slug: 'add-income',
        i18n: 'Add Income',
      },
      {
        url: '/income/manage',
        name: 'View Incomes',
        slug: 'incomes',
        i18n: 'Manage Income',
      },
      {
        url: '/income/categories',
        name: 'Income Categories',
        slug: 'income-categories',
        i18n: 'Income Categories',
      }
    ]
  },
  {
    url: null,
    name: 'Reports',
    slug: 'reports',
    icon: 'PrinterIcon',
    submenu: [{
        url: '/reports/cash-flow',
        name: 'Cash Flow',
        slug: 'cash-flow',
        i18n: 'Cash Flow',
      },
      {
        url: '/reports/financials',
        name: 'Financial Charts',
        slug: 'financials',
        i18n: 'Financial Charts',
      }
    ]
  },
  {
    url: null,
    name: 'Communication',
    slug: 'communication',
    icon: 'Volume1Icon',
    submenu: [{
        url: '/communication/emails',
        name: 'Send Emails',
        slug: 'add-communication',
        i18n: 'Send Emails',
      },
      {
        url: '/communication/sms',
        name: 'Send SMS',
        slug: 'manage',
        i18n: 'Send SMS',
      },
      {
        url: '/communication/send-notification',
        name: 'Send Notification',
        slug: 'send-notification',
        i18n: 'Send Notification',
      },
      {
        url: '/communication/template',
        name: 'Templates',
        slug: 'template',
        i18n: 'Templates',
      }
    ]
  },
  {
    url: null,
    name: 'Users',
    slug: 'users',
    icon: 'UsersIcon',
    submenu: [
      {
        url: '/users/manage',
        name: 'Manage Roles',
        slug: 'manage',
        i18n: 'Manage',
      }
    ]
  },
  {
    url: '/settings',
    name: 'Settings',
    slug: 'settings',
    icon: 'SettingsIcon',
  },
]
