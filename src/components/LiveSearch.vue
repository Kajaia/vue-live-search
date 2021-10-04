<template>
  <div class="container my-5">
    <h1 class="text-center fs-3 text-vue">{{ title }}</h1>
    <div class="row justify-content-center mt-4">
      <div class="col-md-6 my-2">
        <font-awesome-icon
          class="position-absolute search-icon"
          icon="search"
        />
        <input
          class="form-control rounded-pill shadow border-2 search-input"
          type="text"
          placeholder="Ex: Asher"
          autofocus
          v-model="searchValue"
        />
        <div class="mt-1" v-show="searchValue">
          <small> Search query: </small>
          <span class="badge bg-light shadow rounded-pill text-dark">
            {{ searchValue }}
            <font-awesome-icon
              class="search-clear fa-sm"
              @click="clearSearch"
              icon="times"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div
        class="col-6 col-md-4 col-lg-3 my-2"
        v-for="hotel in filteredHotels"
        :key="hotel.id"
      >
        <div class="card h-100 shadow rounded-4 animation border-2 search-card">
          <img
            height="120"
            class="w-100 rounded-top-4 cover"
            :src="`https://intranet.infoajara.com/storage/${hotel.image}`"
            :alt="hotel.name_en"
            v-if="hotel.image"
          />
          <img
            height="120"
            class="w-100 rounded-top-4 cover"
            :src="`https://ui-avatars.com/api/?uppercase=true&bold=true&background=random&size=512&name=${hotel.name_en}`"
            :alt="hotel.name_en"
            v-else
          />
          <div class="card-body">
            <a href="#!" class="stretched-link text-decoration-none text-dark">
              <h6 class="fw-bold">
                {{ hotel.name_en }}
              </h6>
            </a>
            <small>
              {{ hotel.category.name_en }} &bullet;
              {{ hotel.municipality.name_en }}
            </small>
          </div>
        </div>
      </div>
      <div
        class="col-6 col-md-4 col-lg-3 my-2"
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
      >
        <div class="card h-100 shadow rounded-4 animation border-2 search-card">
          <img
            height="120"
            class="w-100 rounded-top-4 cover"
            :src="`https://intranet.infoajara.com/storage/${restaurant.image}`"
            :alt="restaurant.name_en"
            v-if="restaurant.image"
          />
          <img
            height="120"
            class="w-100 rounded-top-4 cover"
            :src="`https://ui-avatars.com/api/?uppercase=true&bold=true&background=random&size=512&name=${restaurant.name_en}`"
            :alt="restaurant.name_en"
            v-else
          />
          <div class="card-body">
            <a href="#!" class="stretched-link text-decoration-none text-dark">
              <h6 class="fw-bold">
                {{ restaurant.name_en }}
              </h6>
            </a>
            <small>
              {{ restaurant.category.name_en }} &bullet;
              {{ restaurant.municipality.name_en }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LiveSearch",
  data() {
    return {
      title: "Vue Live Search",
      hotels: {},
      restaurants: {},
      searchValue: "",
    };
  },
  methods: {
    clearSearch() {
      this.searchValue = "";
    },
  },
  computed: {
    filteredHotels() {
      let hotels = this.hotels;

      if (this.searchValue != "") {
        hotels = hotels.filter((hotel) => {
          if (hotel.name_en != null) {
            return hotel.name_en
              .toUpperCase()
              .includes(this.searchValue.toUpperCase());
          }
        });
      }

      return hotels;
    },
    filteredRestaurants() {
      let restaurants = this.restaurants;

      if (this.searchValue != "") {
        restaurants = restaurants.filter((restaurant) => {
          if (restaurant.name_en != null) {
            return restaurant.name_en
              .toUpperCase()
              .includes(this.searchValue.toUpperCase());
          }
        });
      }

      return restaurants;
    },
  },
  mounted() {
    fetch("https://intranet.infoajara.com/api/hotels")
      .then((response) => response.json())
      .then((data) => {
        this.hotels = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("https://intranet.infoajara.com/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        this.restaurants = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.search-icon {
  margin-top: 0.8em;
  margin-left: 0.8em;
  color: #b8b8bd;
}

.search-clear {
  color: #b8b8bd;
  transition: 0.2s;
}

.search-clear:hover {
  color: #41b783;
  cursor: pointer;
}

.search-input {
  padding-left: 2em;
}

.search-input:focus {
  border: 2px solid #41b783;
}

.search-card {
  transition: 0.2s;
}

.search-card:hover {
  border: 2px solid #41b783;
}

.text-vue {
  color: #41b783;
}

.animation {
  top: 0;
  transition: 0.2s;
}

.animation:hover {
  top: -3px;
}

.animation:active {
  top: 0px;
}

.cover {
  object-fit: cover;
}

.rounded-4 {
  border-radius: 0.75em;
}

.rounded-top-4 {
  border-top-left-radius: 0.75em;
  border-top-right-radius: 0.75em;
}

.rounded-bottom-4 {
  border-bottom-left-radius: 0.75em;
  border-bottom-right-radius: 0.75em;
}
</style>