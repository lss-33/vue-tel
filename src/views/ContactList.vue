<template>
  <div class="contactList">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>
<script>
import contactList from '../views/ContactList.vue'
import axios from 'axios'

export default {
  name: 'contactList',
  component: contactList,
  data() {
    return {
      list: [
        // {
        //   name: 'lishanshan',
        //   tel: '15776548005',
        //   id: 1
        // }
      ],
      instance: null, //axios实例
      showEdit: false, //编辑弹出的显示隐藏
      editingContact: {}, //正在编辑的联系人
      isEdit: false //新建或编辑
    }
  },
  created() {
    this.instance = axios.create({
      baseURL: 'http://localhost:9000/api',
      timeout: 1000
    })
    this.getList()
  },
  methods: {
    //获取联系人列表
    getList() {
      this.instance
        .get('/contactList')
        .then(res => {
          // console.log(res)
          this.list = res.data.data
        })
        .catch(err => {
          console.log(err)
          this.$toast('链接失败，请稍后重试')
        })
    },
    // 添加联系人
    onAdd() {
      this.showEdit = true
      this.isEdit = false
    },
    // 编辑联系人
    onEdit(info) {
      this.showEdit = true
      this.isEdit = true
      this.editingContact = info
    },
    //保存
    onSave(info) {
      if (this.isEdit) {
        //编辑保存
        this.instance
          .put('/contact/edit', info)
          .then(res => {
            if (res.data.code === 200) {
              this.$toast('编辑成功')
              this.showEdit = false
              this.getList()
            }
          })
          .catch(err => {
            this.$toast('链接失败，请稍后重试')
          })
      } else {
        //新建保存
        this.instance
          .post('/contact/new/json', info)
          .then(res => {
            if (res.data.code === 200) {
              this.$toast('新建成功')
              this.showEdit = false
              this.getList()
            }
          })
          .catch(err => {
            this.$toast('链接失败，请稍后重试')
          })
      }
    },
    // 删除
    onDelete(info) {
      this.instance
        .delete('/contact', {
          params: {
            id: info.id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast('删除成功')
            this.getList()
            this.showEdit = false
          }
        })
        .catch(err => {
          this.$toast('请求失败，请稍后重试')
        })
    }
  }
}
</script>
<style scoped>
.van-contact-list_add {
  z-index: 0;
}
.van-popup {
  height: 100%;
}
</style>
