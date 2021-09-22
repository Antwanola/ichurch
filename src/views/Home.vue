<template>
  <vx-card id="home">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/5 mb-base">
        <vs-card class="i-card px-5">
          <div class="text-6xl font-bold green">
            <vs-icon class="text-5xl" icon="supervised_user_circle"></vs-icon>
            <br />
            <span
              class="vs-con-loading__container loading-sound">
            </span>
            <p v-show="!loadingDashboard">{{ dashboardData.numberOfRegisteredMembers }}</p>
          </div>
          <p class="text-lg">Registered Members</p>
        </vs-card>
      </div>
      <div class="vx-col w-full md:w-1/5 mb-base">
        <vs-card class="i-card px-5">
          <div class="text-6xl font-bold purple">
            <vs-icon class="text-5xl" icon="playlist_add_check"></vs-icon>
            <br />
            <span
              class="vs-con-loading__container loading-sound">
            </span>
            <p v-show="!loadingDashboard">{{ dashboardData.numberOfGroups }}</p>
          </div>
          <p class="text-lg">Groups</p>
        </vs-card>
      </div>
      <div class="vx-col w-full md:w-1/5 mb-base">
        <vs-card class="i-card px-5">
          <div class="text-6xl font-bold yellow">
            <vs-icon class="text-5xl" icon="emoji_people"></vs-icon>
            <br />
            <span
              class="vs-con-loading__container loading-sound">
            </span>
            <p v-show="!loadingDashboard">{{ dashboardData.numberOfFirstTimers }}</p>
          </div>
          <p class="text-lg">First Timers</p>
        </vs-card>
      </div>
      <div class="vx-col w-full md:w-1/5 mb-base">
        <vs-card class="i-card px-5">
          <div class="text-6xl font-bold brown">
            <vs-icon class="text-5xl" icon="emoji_people"></vs-icon>
            <br />
            <span
              class="vs-con-loading__container loading-sound">
            </span>
            <p v-show="!loadingDashboard">{{ dashboardData.numberOfFollowUps ? dashboardData.numberOfFollowUps : '-' }}</p>
          </div>
          <p class="text-lg">Follow ups</p>
        </vs-card>
      </div>
      <div class="vx-col w-full md:w-1/5 mb-base">
        <vs-card class="i-card px-5">
          <div class="text-6xl font-bold blue">
            <vs-icon class="text-5xl" icon="library_books"></vs-icon>
            <br />
            <span
              class="vs-con-loading__container loading-sound">
            </span>
            <p v-show="!loadingDashboard">
              {{ dashboardData.averagePercentageAttendanceForLastMonth
                ? Math.round(dashboardData.averagePercentageAttendanceForLastMonth)
                : '-' }}%
            </p>
          </div>
          <p class="text-lg">Attendance</p>
        </vs-card>
      </div>
    </div>
    <!-- charts -->
    <div class="vx-row">
      <div class="vx-col w-full md:w-3/5 mb-base">
        <vx-card title="Income Overview" class="px-5">
          <line-chart :income="dashboardData.totalIncome" :expenses="dashboardData.totalExpenses" />
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-2/5 mb-base">
        <vx-card title="Member Statistics" class="px-4">
          <pie-chart :memberStats="dashboardData.memberStatistics" />
        </vx-card>
      </div>
    </div>
    <!-- charts end -->
    <!-- anniversaries, tasks, logs -->
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="This Month's Aniversaries">
          <vs-progress indeterminate color="primary" v-if="loadingDashboard">primary</vs-progress>
          <vs-list class="h-300">
            <p class="text-secondary" v-if="!loadingDashboard && !dashboardData.anniversariesThisMonth.birthdays || !dashboardData.anniversariesThisMonth.weddings">No anniversaries</p>
            <!-- birthdays -->
            <vs-list-header
              v-if="!loadingDashboard
                && dashboardData.anniversariesThisMonth.birthdays
                && dashboardData.anniversariesThisMonth.birthdays.length"
              title="Birthdays"></vs-list-header>
            <vs-list-item v-for="(item, birt) in dashboardData.anniversariesThisMonth.birthdays" :key="birt" :title="item.name" :subtitle="item.phoneNumber">
              <template slot="avatar">
                <img class="anniversary-photo" :src="item.photo" alt="">
              </template>
              <p>
                {{ formatBirthday(item.birthday) }}
              </p>
            </vs-list-item>
            <!-- weddings -->
            <vs-list-header
              color="success"
              v-if="!loadingDashboard
                && dashboardData.anniversariesThisMonth.weddings
                && dashboardData.anniversariesThisMonth.weddings.length"
              title="Weddings"
              class="mt-4"></vs-list-header>
            <vs-list-item v-for="(item, index) in dashboardData.anniversariesThisMonth.weddings" :key="index" :title="item.name" :subtitle="item.phoneNumber">
              <template slot="avatar">
                <img class="anniversary-photo" :src="item.photo" alt="">
              </template>
              <p>
                {{ formatBirthday(item.weddingAnniversary) }}
              </p>
            </vs-list-item>
          </vs-list>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="Tasks/Reminders">
          <vs-progress indeterminate color="primary" v-if="loadingTasks">primary</vs-progress>
          <vs-list class="h-300">
            <div class="flex items-center" v-for="task in tasks" :key="task._id">
              <vs-checkbox v-model="task.completed" color="primary" size="small" @click="updateTaskState(task)"/>
              <p :class="{'mr-4': true, 'task-complete': task.completed }">{{ task.task }}</p>
              <vs-button class="ml-auto" color="danger" type="flat" size="large" icon="delete" @click="delTask(task._id)"></vs-button>
            </div>
            <div class="absolute bottom-0">
              <div class="vx-row items-end">
                <div class="vx-col w-full md:w-3/4 mb-base">
                  <vs-input
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Add New Task"
                    v-model="task"
                    class="w-full"
                  />
                </div>
                <div class="vx-col w-full md:w-1/4 mb-base">
                  <vs-button color="primary" icon="send" @click="addTask" :disabled="addingTask"></vs-button>
                </div>
              </div>
            </div>
          </vs-list>
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="Activity Logs">
          <vs-list class="h-300">
            <vs-progress indeterminate color="primary" v-if="loadingLogs">primary</vs-progress>
            <vs-list-item v-for="(item, log) in logs" :key="log" :title="item.message">
              <p class="ml-4 text-xs">{{ formatDate(item.createdAt) }}</p>
            </vs-list-item>
          </vs-list>
        </vx-card>
      </div>
    </div>
    <vs-row class="mt-6">
      <vs-card class="px-5">
        <h3 class="mb-6">Events</h3>
        <FullCalendar
          defaultView="dayGridMonth"
          :plugins="calendarPlugins"
          @eventClick="eventClicked"
          :events="events"
        />
        <vs-popup class="holamundo" title="Event Details" :active.sync="showDetails">
          <view-event :selectedEvent="selectedEvent" />
        </vs-popup>
      </vs-card>
    </vs-row>
  </vx-card>
</template>

<script>
import { viewEvents } from '@/api/events'
import { dashboard, getLogs } from '@/api/dashboard'
import { addTask, getTasks, deleteTask, updateTaskState } from '@/api/tasks'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import Line from '../components/charts/LineChart'
import PieChart from '../components/charts/PieChart'
import ViewEvent from '../components/events/View'

export default {
  components: {
    FullCalendar,
    'line-chart': Line,
    'pie-chart': PieChart,
    'view-event': ViewEvent
  },
  data() {
    return {
      dashboardData: {
        anniversariesThisMonth: {}
      },
      calendarPlugins: [dayGridPlugin],
      eventsData: [],
      events: [],
      selectedEvent: {
        start: {},
        end: {}
      },
      showDetails: false,
      task: '',
      tasks: [],
      logs: [],
      addingTask: false,
      loadingTasks: false,
      loadingDashboard: false,
      loadingLogs: false
    }
  },
  mounted() {
    let loading = document.querySelectorAll('.loading-sound')
    loading.forEach(item => {
      this.$vs.loading({
        container: item,
        type: 'sound',
        color: '#757575'
      })
    })
    this.getDashboardData()
    this.getEvents()
    this.getTasks()
    this.getLogs()
  },
  methods: {
    // format date
    formatDate(date) {
      const d = new Date(date)
      return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`
    },
    // format birthday
    formatBirthday (date) {
      const d = new Date(date)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${d.getDate()}-${months[d.getMonth()]}`
    },
    // add tasks
    async addTask () {
      this.addingTask = true
      try {
        await addTask({ task: this.task })
        this.$vs.notify({
          title: 'Notification',
          text: 'Added successfully',
          color: 'success'
        })
        this.task = ''
        this.addingTask = false
        this.getTasks()
      } catch (error) {
        this.addingTask = false
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    // update task completed
    async updateTaskState (task) {
      task.completed = !!task.completed
      try {
        await updateTaskState(task._id)
        this.getTasks()
      } catch (error) {
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    // get all tasks
    async getTasks () {
      this.loadingTasks = true
      try {
        const { data } = await getTasks()
        this.tasks = data.allTasks
        this.loadingTasks = false
      } catch (error) {
        this.loadingTasks = false
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    // delete task
    async delTask (id) {
      try {
        await deleteTask(id)
        this.getTasks()
      } catch (error) {
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    // get activity logs
    async getLogs() {
      this.loadingLogs = true
      try {
        const { data } = await getLogs()
        this.logs = data.logs.reverse()
        this.loadingLogs = false
      } catch (error) {
        this.loadingLogs = false
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    // get dashboard data
    async getDashboardData () {
      this.loadingDashboard = true
      try {
        const { data } = await dashboard()
        this.dashboardData = data.data
        this.$vs.loading.close('.loading-sound > .con-vs-loading')
        this.loadingDashboard = false
      } catch (error) {
        this.loadingDashboard = false
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
      }
    },
    async getEvents() {
      try {
        const { data } = await viewEvents()
        this.eventData = data.events
        let events = []
        for (let i = 0; i < data.events.length; i++) {
          let ev = {}
          ev.title = data.events[i].eventName
          ev.start = data.events[i].start.date
          ev.end = data.events[i].end.date
          ev.groupId = data.events[i]._id
          ev.id = i
          ev.allDay = data.events[i].allDay
          events.push(ev)
        }
        this.events = events
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message || error.message,
          color: 'warning'
        })
      }
    },
    eventClicked(data) {
      const index = parseInt(data.event.id, 10)
      this.selectedEvent = this.eventData[index]
      this.showDetails = true
    }
  }
}
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

.h-300 {
  height: 300px;
  overflow-y: scroll;
}

.anniversary-photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
}

.task-complete {
  text-decoration: line-through;
  color: #BDBDBD;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0,0,0,.5);
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

.i-card {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.vs-card--content {
  text-align: center;

  .green {
    color: #388e3c;
  }
  .blue {
    color: #1976d2;
  }
  .yellow {
    color: #fbc02d;
  }
  .purple {
    color: #512da8;
  }
}
</style>