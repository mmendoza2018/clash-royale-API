var tokenClave = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM3MTY1YmJhLWRlNjEtNDRjNC1iYWIzLWU5OTdhMDNmY2QyNSIsImlhdCI6MTYzMDI5ODk1Niwic3ViIjoiZGV2ZWxvcGVyL2U0YmYzNTE5LTBlY2EtZDM3OS1lMDY2LTI2NGFiZDEwOTZlMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjguMTI4LjEyOC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.1s9RBkXY5szWgb-7_th-ZgbjvayLs2HK56x588x6Qb7w50hxXZ1d8WKb13jUgEzYwbF445feiTA1qVGIHfOJLw`;
      let current_page = 1;
      var records_per_page = 12;

      fetch("https://proxy.royaleapi.dev/v1/cards", {
        headers: {
          Authorization: tokenClave,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          var itemsLength = json.items.length;
          document.addEventListener("click", () => {
            if (event.target.matches("#btn_next")) {
              nextPage(itemsLength, json.items);
              numPages(itemsLength, json.items);
            }
            if (event.target.matches("#btn_prev")) {
              prevPage(itemsLength, json.items);
              numPages(itemsLength, json.items);
            }
            if (event.target.matches(".pages")) {
              changePage(event.target.dataset.pagina, json.items);
            }
          });
          changePage(current_page, json.items);
        })
        .catch((error) => console.log(error));

      async function changePage(page, json) {
        var listing_table = document.getElementById("listingTable"),
            page_span = document.getElementById("page"),
            template = document.querySelector("template").content,
            fragment = document.createDocumentFragment(),
            row = document.querySelector(".row"),
            plantillaPaginacion = "",
            current_page = page;
        // Validate page
        let paginas = await numPages(json.length);
        console.log("paginas", paginas);
        if (page < 1) page = 1;
        if (page > paginas) page = paginas;
        row.innerHTML = "";
        for (
          var i = (page - 1) * records_per_page;
          i < page * records_per_page && i < json.length;
          i++
        ) {
          template.querySelector(".card-header").textContent = json[i].name;
          template.querySelector("img").src = json[i].iconUrls.medium;
          let clone = document.importNode(template, true);
          fragment.appendChild(clone);
        }

        row.appendChild(fragment);
        for (let x = 1; x <= paginas; x++) {
          if (page == x) {
            plantillaPaginacion += `<li class="page-item active"><a class="page-link pages" data-pagina="${x}" href="#">${x}</a></li>`;
          } else {
            plantillaPaginacion += `<li class="page-item"><a class="page-link pages" data-pagina="${x}" href="#">${x}</a></li>`;
          }
        }
        document.getElementById("el-paginacion").innerHTML = plantillaPaginacion;
        if (parseInt(page) === 1) {
          console.log(document.getElementById("btn_prev"));
          document.getElementById("btn_prev").parentElement.classList.add("disabled");
        } else {
          document.getElementById("btn_prev").parentElement.classList.remove("disabled");
        }
        if (parseInt(page) == paginas) {
          document.getElementById("btn_next").parentElement.classList.add("disabled");
        } else {
          document.getElementById("btn_next").parentElement.classList.remove("disabled");
        }
      }
      function prevPage(paginas, json) {
        if (current_page > 1) {
          current_page--;
          changePage(current_page, json);
        }
      }

      function nextPage(paginas, json) {
        if (current_page < paginas) {
          current_page++;
          changePage(current_page, json);
        }
      }

      function numPages(paginas) {
        return Math.ceil(paginas / records_per_page);
      }