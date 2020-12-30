<template>
  <article class="page" ref="page">
    <aside
      :style="{
        backgroundColor: itemColor(item.soul),
      }"
      class="row"
    >
      <PageRoute :id="item.soul" />
      <div class="spacer"></div>
      <span class="close" @click="$emit('close')">
        <span class="iconify" data-icon="la:times"></span>
      </span>
    </aside>

    <section class="content">
      <div class="main">
        <PageIcon
          :editable="editable"
          :icon="item.icon"
          @edit="edit.icon = !edit.icon"
        />
        <div class="info">
          <PageTitle
            :editable="editable"
            :type="item.type"
            :text="item.title"
            @update="update('title', $event)"
          />
          <div class="author">
            <UserPill :author="item.soul.slice(1, 88)" />
            &nbsp;
            <ItemInfoDate :item="item" />
          </div>
        </div>
      </div>

      <EditFile
        v-if="edit.icon"
        @loaded="update('icon', $event.content)"
        @close="edit.icon = false"
      />
      <PageDescription
        :text="item.description"
        :editable="editable"
        @update="update('description', $event)"
      />

      <Rating :horizontal="true" :item="item.soul" />
    </section>
    <UserTeam :id="item.soul" :editable="editable" />

    <List
      @open="$emit('open', $event)"
      v-for="type in model[item.type]"
      :key="type"
      :type="type"
      :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
    />
    <CommentList :id="item.soul" />
    <Log :id="item.soul" :editable="editable" />
  </article>
</template>

<script lang="ts">
import { ref, watch, watchEffect, computed, reactive, onMounted } from "vue";
import { useItem } from "../use/item";
import { model } from "../store/model";
import { user } from "../store/user";
import { itemColor } from "../tools/colors";
import { appPath, gun } from "../store/gun-db";

export default {
  props: ["id"],
  emits: ["open", "close", "renamed"],
  setup(props) {
    const title = ref(null);

    const page = ref(null);
    const mounted = ref(false);
    watchEffect(() => {
      if (mounted.value) {
        setTimeout(() => {
          page.value.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    });
    onMounted(() => {
      mounted.value = true;
    });

    const { item, edit, update, editable } = useItem(props.id);

    watch(
      () => edit.title,
      (val) => {
        if (val) {
          setTimeout(() => {
            title.value.focus();
          }, 100);
        }
      }
    );

    return {
      itemColor,
      editable,
      appPath,
      update,
      title,
      model,
      item,
      edit,
      page,
    };
  },
};
</script>

<style scoped>
.page {
  color: #333;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-flow: column nowrap;
}
.main {
  display: flex;
  align-items: center;
  padding: 1em;
}
.title {
  display: flex;
  align-items: center;
  font-size: 1.8em;
}
.title h3 {
  margin: 0.5em 0;
}
.author {
  display: flex;
  align-items: center;
}
.row {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 30;
  font-size: 12px;
  height: 24px;
}
.pill {
  margin: 4px;
  padding: 0 8px 0 4px;
}
.info {
  font-size: 0.7em;
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  padding: 4px;
  flex: 1 1 360px;
}
.close {
  padding: 8px 16px;
}
</style>