<template>
  <svg
    v-if="!active"
    focusable="false"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 32 32"
  >
    <path
      d="M15 4c-.523 0-1.059.184-1.438.563C13.184 4.94 13 5.476 13 6v1H7v2h1v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V9h1V7h-6V6c0-.523-.184-1.059-.563-1.438C20.06 4.184 19.523 4 19 4zm0 2h4v1h-4zm-5 3h14v16c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1zm2 3v11h2V12zm4 0v11h2V12zm4 0v11h2V12z"
      fill="currentColor"
    ></path>
  </svg>
  <svg
    v-if="active"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1.5em"
    height="1.5em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <path
      d="M15 4c-.522 0-1.06.184-1.438.563C13.185 4.94 13 5.478 13 6v1H7v2h1v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V9h1V7h-6V6c0-.522-.184-1.06-.563-1.438C20.06 4.186 19.523 4 19 4h-4zm0 2h4v1h-4V6zm-5 3h14v16c0 .555-.445 1-1 1H11c-.555 0-1-.445-1-1V9zm7 3l-4 4h3v7h2v-7h3l-4-4z"
      fill="currentColor"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "LaTrashSolid",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

