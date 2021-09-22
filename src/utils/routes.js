export const BASE_URL = "https://ichurch-01.herokuapp.com/api";

// auth routes

export const LOGIN = '/auth/admin-login'

export const CREATE_PASSWORD = '/auth/createpassword'

export const CHANGE_PASSWORD = '/auth/changepassword'

export const FORGOT_PASSWORD = '/auth/forgotpassword'

export const LOGOUT = '/auth/admin-logout'

// dashboard

export const DASHBOARD = '/dashboard'

// tasks

export const ADD_TASK = '/task/create-task'

export const GET_TASKS = '/task/all-tasks'

export const DELETE_TASK = '/task/delete-task'

export const TASK_COMPLETED_STATE = '/task/check-uncheck-task'

// attendance routes

export const ADD_ATTENDANCE = '/attendance/add-report'

export const VIEW_ATTENDANCE = '/attendance/view-reports'

export const ATTENDANCE_CHECK_IN = '/attendance/retrieve-check-ins'

// sermon routes

export const VIEW_SERMON = '/sermon/view-sermons'

export const VIEW_SINGLE_SERMON = '/sermon/view-sermon'

export const ADD_SERMON = '/sermon/add-sermon'

export const EDIT_SERMON = '/sermon/edit-sermon'

export const DELETE_SERMON = '/sermon/delete-sermon'

// members routes

export const VIEW_MEMBERS = '/member/view-members'

export const VIEW_MEMBER = '/member/member-details'

export const ADD_MEMBER = '/member/add-member'

export const EDIT_MEMBER = '/member/edit-member'

export const DELETE_MEMBER = '/member/delete-member'

export const UNCONFIRMED_MEMBERS = '/member/unconfirmed-members'

export const MULTIPLE_MEMBER = '/member/add-multiple-members'

export const MAKE_ADMIN = '/member/make-admin-or-not'

// group routes

export const CREATE_GROUP = '/group/create-group'

export const VIEW_GROUPS = '/group/view-groups'

export const EDIT_GROUP = '/group/edit-group'

// news routes

export const ADD_NEWS = '/news/add-news'

export const VIEW_ALL_NEWS = '/news/view-all-news'

export const EDIT_NEWS = '/news/edit-news'

export const DELETE_NEWS = '/news/delete-news'

// pastors routes

export const ADD_PASTOR = '/pastor/add-pastor'

export const VIEW_PASTORS = '/pastor/view-pastors'

export const VIEW_PASTOR = '/pastor/view-pastor'

export const EDIT_PASTOR = '/pastor/edit-pastor'

export const DELETE_PASTOR = '/pastor/delete-pastor'

// about routes

export const VIEW_ABOUT = '/about/view-about'

export const EDIT_ABOUT = '/about/edit-info'

export const ADD_INFO = '/about/add-info'

// branch routes

export const ADD_BRANCH = '/branch/add-branch'

export const VIEW_BRANCHES = '/branch/view-branches'

export const VIEW_BRANCH = '/branch/view-branch'

export const EDIT_BRANCH = '/branch/edit-branch'

export const DELETE_BRANCH = '/branch/delete-branch'

// devotional routes

export const ADD_DEVOTIONAL = '/devotional/add-devotional'

export const VIEW_DEVOTIONALS = '/devotional/view-all-devotionals'

export const VIEW_DEVOTIONAL = '/devotional/view-devotional'

export const EDIT_DEVOTIONAL = '/devotional/edit-devotional'

export const DELETE_DEVOTIONAL = '/devotional/delete-devotional'

// streams routes

export const VIEW_STREAMS = '/stream-urls/view-url'

export const EDIT_STREAMS = '/stream-urls/edit-url'

export const ADD_STREAMS = '/stream-urls/add-url'

// first timer routes

export const ADD_FIRST_TIMER = '/first-timers/add-first-timer'

export const VIEW_FIRST_TIMER = '/first-timers/view-first-timers'

export const EDIT_FIRST_TIMER = '/first-timers/edit-first-timer'

export const SINGLE_FIRST_TIMER = '/first-timers/view-first-timers-details'

// events routes
export const ADD_EVENT = '/event/add-event'

export const VIEW_EVENTS = '/event/all-events'

export const EDIT_EVENT = '/event/edit-event'

// family tree routes

export const ADD_FAMILY_TREE = '/family-tree/add-family-tree'

export const GET_LASTNAMES = '/family-tree/get-lastnames'

export const RETRIEVE_NAMES = '/family-tree/retrieve-names'

export const ALL_FAMILY_TREES = '/family-tree/all-family-trees'

// follow ups

export const ADD_FOLLOW_UP = '/followup/add-followup'

export const VIEW_FOLLOW_UPS = '/followup/all-followups'

export const ADD_FOLLOWUP_CATEGORY = '/followup/category/add-category'

export const GET_CATEGORIES = '/followup/category/all-categories'

export const ALL_FOLLOW_UPS = '/followup/all-followups'

export const MY_FOLLOW_UPS = '/followup/my-followups'

export const FOLLOWUP_CATEGORIES = '/followup/category/all-categories'

// contribution apis

export const ALL_TYPES = '/contribution/type/all-types'

export const ADD_TYPE = '/contribution/type/add-type'

export const DEL_TYPE = '/contribution/type/delete-type'

export const ADD_CONTRIBUTION = '/contribution/add-contribution'

export const ALL_CONTRIBUTIONS = '/contribution/all-contributions'

// staff apis

export const ADD_STAFF = '/staff/add-staff'

export const ALL_STAFF = '/staff/all-staffs'

export const VIEW_STAFF = '/staff/staff-details'

export const DELETE_STAFF = '/staff/delete-staff'

export const EDIT_STAFF = '/staff/edit-staff'

// payroll apis

export const VIEW_PAYROLL = '/payroll/view-payrolls'

export const ADD_PAYROLL = '/payroll/add-payroll'

// expenses apis

export const EXPENSE_CATEGORIES = '/expense/category/all-categories'

export const DEL_EXPENSE_CATEGORY = '/expense/category/delete-category'

export const ADD_EXPENSE_CATEGORY = '/expense/category/add-category'

export const ADD_EXPENSE = '/expense/add-expense'

export const VIEW_EXPENSE = '/expense/view-expenses'

export const EDIT_EXPENSE_CATEGORY = '/expense/category/edit-category'

// income apis

export const INCOME_CATEGORIES = '/income/category/all-categories'

export const DEL_INCOME_CATEGORY = '/income/category/delete-category'

export const ADD_INCOME_CATEGORY = '/income/category/add-category'

export const ADD_INCOME = '/income/add-income'

export const VIEW_INCOME = '/income/view-incomes'

export const EDIT_INCOME_CATEGORY = '/income/category/edit-category'

// communication apis

export const SENT_SMS = '/communication/sms/sent-sms'

export const SEND_SMS = '/communication/sms/send-sms'

export const SEND_EMAIL = '/communication/email/send-email'

export const SENT_EMAILS = '/communication/email/sent-emails'

export const RETRIEVE_TEMPLATE = '/communication/template/retrieve-template'

export const ADD_TEMPLATE = '/communication/template/add-template'

export const EDIT_TEMPLATE = '/communication/template/edit-template'

// settings apis

export const RETRIEVE_KEYS = '/settings/retrieve-keys'

export const SAVE_KEYS = '/settings/save-keys'

export const EDIT_KEYS = '/settings/edit-keys'

export const DEFAULT_IMAGES = '/settings/default-images'

export const SEND_NOTIFICATION = '/settings/send-notification'

// reports apis

export const CASH_FLOW = '/reports/cash-flow'

export const FINANCIALS = '/reports/financial-charts'

// activity logs

export const RETRIEVE_LOGS = '/logs/retrieve-logs'

// download table data

export const DOWNLOAD_FIRST_TIMERS = '/pdf/download-first-timers'

export const DOWNLOAD_PAYROLL = '/pdf/download-payroll'

export const DOWNLOAD_ALL_MEMBERS = '/pdf/download-all-members'
