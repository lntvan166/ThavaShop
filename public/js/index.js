$(document).ready(function () {
  const query = new URLSearchParams(window.location.search).get("sortBy");
  $(`select[name="sortBy"] option:contains(${query})`).prop({
    selected: true,
  });
});
