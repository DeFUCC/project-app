import { reactive } from 'vue'

interface FeedParams {
  item: string
  type: string
}

interface Feed {
  type: string
  id: string
  root?: string
}

export function useFeeds(starter: FeedParams) {
  const feeds = reactive([])

  function openFeed(view: Feed, num: number) {
    feeds[num + 1] = view
    feeds.splice(num + 2)
  }

  function closeFeed(num: number) {
    feeds.splice(num, 1)
  }

  return {
    feeds,
    openFeed,
    closeFeed,
  }
}
