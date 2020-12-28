<template>
  <article class="page">
    <section
      :style="{
        backgroundColor: itemColor(item.soul),
      }"
      class="row"
    >
      <span class="close" @click="$emit('close')">
        <span class="iconify" data-icon="la:angle-left-solid"></span> </span
      ><ItemLink class="pill" :editable="editable" :link="item.parent" />
      <div class="pill">{{ item.title }}</div>
    </section>
    <header
      :style="{
        backgroundColor: itemColor(item.soul),
      }"
    >
      <div class="main">
        <ItemInfoIcon
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
      <RatingBlock :horizontal="true" :item="item.soul" />
    </header>
    <section class="features">
      <EditFile
        v-if="edit.icon"
        @loaded="update('icon', $event.content)"
        @close="edit.icon = false"
      />
    </section>
    <section class="content">
      <PageDescription
        :text="item.description"
        :editable="editable"
        @update="update('description', $event)"
      />
    </section>
    <CommentList :id="item.soul" />
    <ListItems
      @open="$emit('open', $event)"
      v-for="type in model[item.type]"
      :key="type"
      :type="type"
      :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
    />

    <LogList :id="item.soul" :editable="editable" />
  </article>
</template>

<script lang="ts">
import { ref, watch, watchEffect, computed, reactive } from "vue";
import { useItem } from "../../use/item";
import { model } from "../../store/model";
import { user } from "../../store/user";
import { itemColor } from "../../tools/colors";
import { appPath, gun } from "../../store/gun-db";

export default {
  props: ["id"],
  emits: ["open", "close", "renamed"],
  setup(props) {
    const title = ref(null);

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
  padding: 1em 0;
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
}
.pill {
  margin: 4px;
  border-radius: 2em;
  padding: 0 8px 0 4px;
}
.info {
  font-size: 0.7em;
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  padding: 4px;
}
</style>