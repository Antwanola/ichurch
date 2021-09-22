<template>
  <div>
    <p>
      <strong>Group Name:</strong>
      {{ data.groupName }}
    </p>
    <p>
      <strong>Group Leader:</strong>
      <span
        class="mr-2"
        :key="index"
        v-for="(leader, index) in data.groupLeader"
      >{{ leader.firstName }} {{ leader.lastName }}</span>
    </p>
    <p>
      <strong>Group Members:</strong>
      <span
        class="mr-2"
        :key="index"
        v-for="(member, index) in data.members"
      >{{ member.firstName }} {{ member.lastName }},</span>
    </p>
    <p>
      <strong>Group Description:</strong>
      {{ data.groupDescription }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>