<template>
  <article
    class="page"
    ref="page"
    :style="{
      borderColor: itemColor(item.parent),
    }"
  >
    <PageBar
      @close="$emit('close')"
      @open="$emit('open', $event)"
      :id="item.soul"
    />

    <section class="content">
      <RatingBar :horizontal="true" :id="item.soul" />
      <div class="main">
        <EditFile
          v-if="edit.icon"
          @loaded="update('icon', $event.content)"
          @close="edit.icon = false"
        />
        <EditIcon
          :editable="editable"
          :icon="item.icon"
          @edit="edit.icon = !edit.icon"
        />
        <div class="info">
          <EditTitle
            :editable="editable"
            :type="item.type"
            :text="item.title"
            @update="update('title', $event)"
          />
          <div class="author">
            <UserPill :author="item.soul.slice(1, 88)" />
            &nbsp;
            <ItemDate :item="item" />
            <EditStatus :id="item.soul" :editable="editable" />
            <router-link :to="{ path: '/app/page', query: { id: item.soul } }"
              ><i class="iconify" data-icon="la:link"></i
            ></router-link>
          </div>
        </div>
      </div>
      <EditTeam v-if="false" :id="item.soul" :editable="editable" />

      <EditDate type="start" :id="item.soul" :editable="editable" />
      <EditDate type="finish" :id="item.soul" :editable="editable" />
      <EditDescription
        :text="item.description"
        :editable="editable"
        @update="update('description', $event)"
      />
    </section>

    <ItemsContainer
      :type="item.type"
      @open="$emit('open', $event)"
      :parent="item.type == 'user' ? `~${item.pub}/${appPath}` : item.soul"
    />

    <CommentList :id="item.soul" />
    <PageLog :id="item.soul" :editable="editable" />
  </article>
</template>

<script lang="ts">
import { ref, watch, watchEffect, computed, reactive, onMounted } from "vue";
import { truncate } from "../../use/item";
import { model } from "../../store/model";
import { user } from "../../store/user";
import { itemColor } from "../../tools/colors";
import { appPath, gun } from "../../store/gun-db";
import { notify } from "../../store/history";

export default {
  props: ["id"],
  emits: ["open", "close", "renamed"],
  setup(props) {
    const item = reactive({
      soul: props.id,
      title: null,
      type: "design",
      pub: null,
      team: {},
    });

    const gunItem = gun.get(props.id);

    gunItem.map().on((data: any, key: string) => {
      item[key] = data;
    });

    const edit = reactive({
      icon: false,
      title: false,
      description: false,
    });

    function update(field: string, content: string) {
      let cert = null;
      if (item.team[user.is.pub]) {
        cert = item.team[user.is.pub];
        console.log(cert);
      }
      gunItem.get(field).put(content, null, { opt: { cert: cert } });
      gunItem.get("updatedAt").put(Date.now(), null, { opt: { cert: cert } });
      gunItem
        .get("log")
        .get(Date.now())
        .put("edited|" + field, null, { opt: { cert: cert } });
      edit[field] = false;
      notify(
        `You updated ${field} of ${item.title} with ${truncate(content)}.`
      );
    }

    const editable = computed(() => {
      let my = user?.is?.pub == props?.id.slice(1, 88);
      let me = item.type == "user" && user?.is?.pub == item.pub;
      let teammate = Boolean(item.team[user?.is?.pub]);
      return user.is && (my || me || teammate);
    });

    const page = ref(null);
    const mounted = ref(false);
    watchEffect(() => {
      if (mounted.value) {
        setTimeout(() => {
          page.value?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    });
    onMounted(() => {
      mounted.value = true;
    });

    return {
      itemColor,
      editable,
      appPath,
      update,
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
  border-left: 6px solid #999;
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
</style>