const status = 200
const data = [
  {
    id: 1,
    src: "http://www.gstatic.com/tv/thumb/persons/983712/983712_v9_ba.jpg",
    name: "Lionel Messi",
    desc: "Ahihi",
    birth: "24/6/1987",
    team: "F.C Barcelona",
    startAt: "12/12/1222",
    endAt: "12/12/1222",
    GF: 12
  },
  {
    id: 2,
    src: "http://www.gstatic.com/tv/thumb/persons/983712/983712_v9_ba.jpg",
    name: "Lionel Messi",
    desc: "Ahihi",
    birth: "24/6/1987",
    team: "F.C Barcelona",
    startAt: "12/12/1222",
    endAt: "12/12/1222",
    GF: 12
  }
]
export async function getAllPlayer() {
  return {
    status,
    data
  }
}
export async function getDetailPlayerRequest(id) {
  let detail = data.find(x => x.id == id)
  return {
    status,
    detail
  }
}
