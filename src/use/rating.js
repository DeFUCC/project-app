import { appPath } from "store@gun-db";
import { reactive, computed, ref } from "vue";
import { db, gun, soul } from "store@gun-db";
import { user } from "store@user";

const types = ["star", "seen", "trash"];

export function useItemRating(id) {
  const rating = reactive({
    item: id,
    star: {},
    seen: {},
    trash: {},
  });

  const myRate = reactive({
    star: false,
    seen: false,
    trash: false,
  });

  const count = reactive({
    all: computed(() => {
      let sum = count.seen + count.star + count.trash;
      return sum;
    }),
    seen: computed(() => {
      return Object.keys(rating.seen).length;
    }),
    star: computed(() => {
      return Object.keys(rating.star).length;
    }),
    trash: computed(() => {
      return Object.keys(rating.trash).length;
    }),
  });

  if (user.is) {
    types.forEach((type) => {
      gun
        .user()
        .get(appPath)
        .get("rate")
        .get(type)
        .map()
        .on((data, key) => {
          if (key == id) {
            myRate[type] = Boolean(soul(data));
          }
        });
    });
  }

  db.get("user")
    .map()
    .on((data, key) => {
      getUserRating(key);
    });

  function getUserRating(userId) {
    let userProfile;
    const userRating = gun
      .user(userId)
      .once((d) => {
        userProfile = d;
      })
      .get(appPath)
      .get("rate");
    types.forEach((type) => {
      userRating
        .get(type)
        .get(id)
        .on((data, key) => {
          if (key == id) {
            if (data) {
              rating[type][userId] = userProfile;
            } else {
              delete rating[type][userId];
            }
          }
        });
    });
  }

  function rate(type) {
    if (!user.is) return;
    let current;
    let item = gun.get(id);
    gun
      .user()
      .get(appPath)
      .get("rate")
      .get(type)
      .get(id)
      .once(function (data) {
        if (!data) {
          this.put(item);
        } else {
          this.put(null);
        }
      });
  }

  return {
    myRate,
    count,
    rate,
  };
}
