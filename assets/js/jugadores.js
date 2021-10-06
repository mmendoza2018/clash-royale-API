let objChest = [{
        name: "Wooden Chest",
        url: "https://i1.wp.com/clashroyalekingdom.com/wp-content/uploads/2017/09/wooden-chest-1.png?ssl=1"
    },
    {
        name: "Crown Chest",
        url: "https://www.pngkit.com/png/full/33-337141_chest-png-clash-royale-banner-royalty-free-library.png"
    },
    {
        name: "Silver Chest",
        url: "https://clashroyalekingdom.com/wp-content/uploads/2017/09/silver-chest-1.png"
    },
    {
        name: "Golden Chest",
        url: "https://i0.wp.com/clashroyalekingdom.com/wp-content/uploads/2017/09/golden-chest-1.png?fit=332%2C332&ssl=1"
    },
    {
        name: "Magical Chest",
        url: "http://clashroyalers.weebly.com/uploads/7/9/8/4/79848022/51.png?342"
    },
    {
        name: "Giant Chest",
        url: "https://www.pngkey.com/png/full/288-2883651_giant-chest-clash-royale-super-epic-chest.png"
    },
    {
        name: "Mega Lightning Chest",
        url: "https://www.deckshop.pro/img/chests/legendary.png"
    },
    {
        name: "Epic Chest",
        url: "https://www.pngkit.com/png/full/243-2435230_clash-royale-epic-chest-png-png-transparent-library.png"
    },
    {
        name: "Legendary Chest",
        url: "https://www.nicepng.com/png/full/438-4380176_legendary-chest-clash-royale-legendary-chest-png.png"
    },
    {
        name: "Lightning Chest",
        url: "https://clashroyale.com/uploaded-images/lightning.png?mtime=20180423044833"
    },
    {
        name: "Fortune Chest",
        url: "https://clashroyale.com/uploaded-images/fortune.png?mtime=20180423044824"
    },
    {
        name: "King's Chest",
        url: "https://i.pinimg.com/originals/1f/1c/57/1f1c578075f8af3e17db1a05afbcaa13.png"
    },
    {
        name: "Legendary King's Chest",
        url: "https://www.pngkey.com/png/full/20-208393_legendary-kings-chest-clash-royale-king-chest.png"
    },
    {
        name: "Gold Crate",
        url: "https://www.deckshop.pro/img/chests/plentiful-gold-crate.png"
    },
    {
        name: "Plentiful Gold Crate",
        url: "https://cdn.royaleapi.com/static/img/chests/chest-overflowinggoldcrate.png?t=9c7d4770c"
    },
    {
        name: "Overflowing Gold Crate",
        url: "https://cdn.royaleapi.com/static/img/chests/chest-overflowinggoldcrate.png?t=9c7d4770c"
    },

]

let autorizacion = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM3MTY1YmJhLWRlNjEtNDRjNC1iYWIzLWU5OTdhMDNmY2QyNSIsImlhdCI6MTYzMDI5ODk1Niwic3ViIjoiZGV2ZWxvcGVyL2U0YmYzNTE5LTBlY2EtZDM3OS1lMDY2LTI2NGFiZDEwOTZlMiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMjguMTI4LjEyOC4xMjgiXSwidHlwZSI6ImNsaWVudCJ9XX0.1s9RBkXY5szWgb-7_th-ZgbjvayLs2HK56x588x6Qb7w50hxXZ1d8WKb13jUgEzYwbF445feiTA1qVGIHfOJLw`;
let optionFetch = {
    headers: {
        Authorization: autorizacion,
    }
}
const obtenerDatos = (tagJugador) => {
    let cont = 0,
        fragment = document.createDocumentFragment(),
        htmlChest = "",
        mazoFavorito = "";


    fetch(`https://proxy.royaleapi.dev/v1/players/${tagJugador}`, optionFetch)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            document.getElementById("nombre").textContent = json.name;
            document.getElementById("idJugador").textContent = json.tag;
            document.getElementById("descripcionTrofeos").textContent = `${json.arena.name}-${json.trophies}`;
            document.getElementById("descripcionClan").textContent = `${json.clan.name}-${json.tag}`;
            document.getElementById("trofeos").textContent = `${json.trophies}`;
            document.getElementById("victorias").textContent = `${json.wins}`;
            document.getElementById("victoriaGuerra").textContent = `${json.warDayWins}`;
            document.getElementById("perdidas").textContent = `${json.losses}`;
            document.getElementById("maxVictorias").textContent = `${json.challengeMaxWins}`;
            document.getElementById("batallas").textContent = `${json.battleCount}`;

            document.getElementById("imgFavorita").src = `${json.currentFavouriteCard.iconUrls.medium}`;

            json.currentDeck.forEach(e => {
                mazoFavorito += `<div class="col-3"><img src="${e.iconUrls.medium}" alt="" id="imgFavorita" class="img-fluid"></div>`;
            });
            document.getElementById("colleccionMazoFav").innerHTML = mazoFavorito;
            Promise.all([
                    fetch(`https://proxy.royaleapi.dev/v1/players/${tagJugador}/upcomingchests`, optionFetch),
                    fetch(`https://proxy.royaleapi.dev/v1/players/${tagJugador}/battlelog`, optionFetch)
                ])
                .then(respuesta => Promise.all(respuesta.map((res) => res.json())))
                .then(json => {
                    console.log(json)
                    json[0].items.forEach(e => {
                        objChest.forEach(i => {
                            if (i.name == e.name) {
                                htmlChest += `<div class="col-sm-2">
                                    <div class="card">
                                    <img src="${i.url}" class="img-fluid" alt="...">
                                    <div class="card-footer">
                                        <b>${i.name}</b>
                                    </div>
                                    </div></div>`
                            }
                        });
                    });
                    document.getElementById("chest").innerHTML = htmlChest;

                    json[1].forEach(y => {
                        document.getElementById("batallasHechas").innerHTML = "";
                        let template = document.querySelector("template").content;
                        descripcionBatalla = template.getElementById("descBat"),
                        cantidadCopas = template.getElementById("cantidad"),
                        yo = template.getElementById("yo"),
                        oponente = template.getElementById("oponente"),
                        listaImgYo = yo.querySelectorAll("div img"),
                        listaImgOponente = oponente.querySelectorAll("div img"),
                        tagOponente = template.getElementById("tagOponente"),
                        tagYo = template.getElementById("tagYo"),
                        coronasYo = template.getElementById("coronasYo"),
                        coronasOponente = template.getElementById("coronasOponente");

                        cantidadCopas.textContent = y.team[0].trophyChange;
                        tagOponente.textContent = y.opponent[0].name;
                        coronasYo.textContent = y.team[0].crowns;
                        coronasOponente.textContent = y.opponent[0].crowns;

                        tagYo.textContent = y.team[0].name;
                        if (Math.sign(y.team[0].trophyChange) == 1) {
                            descripcionBatalla.textContent = "Victoria"
                            descripcionBatalla.cantidadCopas = y.team[0].trophyChange;
                            descripcionBatalla.classList.remove("bg-danger")
                            descripcionBatalla.classList.add("bg-success")
                        } else if (Math.sign(y.team[0].trophyChange) == -1) {
                            descripcionBatalla.textContent = "Derrota"
                            descripcionBatalla.cantidadCopas = y.team[0].trophyChange;
                            descripcionBatalla.classList.add("bg-danger")
                            descripcionBatalla.classList.remove("bg-success")
                        }
                        var cont1 = 0;
                        var cont2 = 0;
                        y.team[0].cards.forEach(e => {
                            if (cont1 < 8) listaImgYo[cont1].src = e.iconUrls.medium;
                            cont1++;
                        });
                        y.opponent[0].cards.forEach(t => {
                            if (cont2 < 8) listaImgOponente[cont2].src = t.iconUrls.medium;
                            cont2++;
                        });
                        let clone = document.importNode(template, true);
                        fragment.appendChild(clone)
                    });
                    document.getElementById("batallasHechas").appendChild(fragment)
                })
        })
        .catch(error => console.log(error))
}

document.addEventListener("click", () => {
    if (event.target.matches("#addon-wrapping *")) {
        console.log(event);
        let tag = document.getElementById("tag").value;
        tag.slice(1)
        obtenerDatos(`%23${tag.slice(1)}`)
    }
})
document.addEventListener("DOMContentLoaded", () => {
    obtenerDatos("%238J9G2228")
})