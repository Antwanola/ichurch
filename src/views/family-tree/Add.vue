<template>
  <vx-card id="main">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Last name" v-model="selectedLastName">
          <vs-select-item
            :key="index"
            :value="name"
            :text="name"
            v-for="(name, index) in lastNames"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Father'" v-model="father" autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Mother'" v-model="mother" autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Uncles'" v-model="uncles" multiple autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Aunties'" v-model="aunties" multiple autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Sons'" v-model="sons" multiple autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" :label="processing ? 'loading family members' : 'Daughters'" v-model="daughters" multiple autocomplete>
          <vs-select-item
            :key="index"
            :value="name.id"
            :text="name.name"
            v-for="(name, index) in names"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12"></vs-col>
    </vs-row>
    <vs-button @click="addFamilyTree" :disabled="adding || processing">Add Family</vs-button>
  </vx-card>
</template>

<script>
import { addFamilyTree, retrieveNames, getLastNames } from '@/api/family'

export default {
  data() {
    return {
      selectedLastName: '',
      names: [],
      father: '',
      mother: '',
      uncles: [],
      aunties: [],
      sons: [],
      daughters: [],
      lastNames: [],
      processing: false,
      adding: false
    }
  },
  watch: {
    selectedLastName(newValue) {
      this.father = ''
      this.mother = ''
      this.sons = []
      this.daughters = []
      this.uncles = []
      this.aunties = []
      this.retrieveNames(newValue)
    }
  },
  mounted () {
    this.getLastNames()
  },
  methods: {
    async getLastNames () {
      this.$vs.loading({
        container: '#main',
        scale: 0.6
      })
      try {
        const { data } = await getLastNames()
        this.lastNames = data.lastNames
        this.$vs.loading.close('#main > .con-vs-loading')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.$vs.loading.close('#main > .con-vs-loading')
      }
    },
    async retrieveNames (name) {
      this.processing = true
      try {
        const { data } = await retrieveNames(name)
        this.names = data.names
        this.processing = false
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.processing = false
      }
    },
    async addFamilyTree() {
      this.adding = true
      const payload = {
        lastName: this.selectedLastName,
        father: this.father,
        mother: this.mother,
        uncles: this.uncles,
        aunties: this.aunties,
        sons: this.sons,
        daughters: this.daughters
      }

      try {
        const { data } = await addFamilyTree(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.father = ''
        this.mother = ''
        this.sons = []
        this.daughters = []
        this.uncles = []
        this.aunties = []
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>