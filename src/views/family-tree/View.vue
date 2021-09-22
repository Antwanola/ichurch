<template>
  <vx-card>
    <!-- <vs-tabs position="left" alignment="left">
      <vs-tab v-for="(family, index) in families" :key="index" :label="family.name">
        <div id="tree-simple"></div>
      </vs-tab>
      <vs-tab label="family.name">
        <div id="tree-simple"></div>
      </vs-tab>
      <vs-tab label="family.surname">
        <div id="tree-simple"></div>
      </vs-tab>
    </vs-tabs> -->
    <vs-table stripe :data="families" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Family</vs-th>
        <vs-th>Father</vs-th>
        <vs-th>Mother</vs-th>
        <vs-th>Sons</vs-th>
        <vs-th>Daughters</vs-th>
        <vs-th>Uncles</vs-th>
        <vs-th>Aunties</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
          <vs-td :data="data[index].father">{{ data[index].father }}</vs-td>
          <vs-td :data="data[index].mother">{{ data[index].mother }}</vs-td>
          <vs-td :data="data[index].sons">{{ data[index].sons.toString() }}</vs-td>
          <vs-td :data="data[index].daughters">{{ data[index].daughters.toString() }}</vs-td>
          <vs-td :data="data[index].uncles">{{ data[index].uncles.toString() }}</vs-td>
          <vs-td :data="data[index].aunties">{{ data[index].aunties.toString() }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { allFamilyTrees } from '@/api/family'

export default {
  data() {
    return {
      families: []
    }
  },
  async mounted () {
    this.$vs.loading({
      container: '#table',
      scale: 0.6
    })
    try {
      let { data } = await allFamilyTrees()
      data = data.fanilyTrees
      let families = []
      data.forEach(family => {
        let father = ''
        family.father.forEach(person => {
          father += `${person.firstName} ${person.lastName}`
        })
        let mother = ''
        family.mother.forEach(person => {
          mother += `${person.firstName} ${person.lastName}`
        })
        let sons = []
        family.sons.forEach(son => {
          sons.push(`${son.firstName} ${son.lastName}`)
        })
        let daughters = []
        family.daughters.forEach(daughter => {
          daughters.push(`${daughter.firstName} ${daughter.lastName}`)
        })
        let uncles = []
        family.uncles.forEach(uncle => {
          uncles.push(`${uncle.firstName} ${uncle.lastName}`)
        })
        let aunties = []
        family.aunties.forEach(aunty => {
          aunties.push(`${aunty.firstName} ${aunty.lastName}`)
        })
        families.push({
          name: family.lastName,
          father,
          mother,
          sons,
          daughters,
          uncles,
          aunties
        })
      })
      this.families = families
      this.$vs.loading.close('#table > .con-vs-loading')
    } catch (error) {
      this.$vs.loading.close('#table > .con-vs-loading')
    }
    // const simple_chart_config = {
    //   chart: {
    //     container: '#tree-simple'
    //   },
    //   nodeStructure: {
    //     text: { name: families[0].father },
    //     children: [
    //       {
    //         text: { name: families[0].mother },
    //         children: [
    //           {
    //             text: { name: families[0].sons.toString() }
    //           },
    //           {
    //             text: { name: families[0].daughters.toString() }
    //           },
    //           {
    //             text: { name: families[0].uncles.toString() }
    //           },
    //           {
    //             text: { name: families[0].aunties.toString() }
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
    // const my_chart = new Treant(simple_chart_config)
  },
}
</script>

<style lang="scss" scoped>

</style>