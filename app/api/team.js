const status = 200
const data = [
  {
    id: 1,
    src: "http://www.gstatic.com/tv/thumb/persons/983712/983712_v9_ba.jpg",
    name: "F.C Barcelona",
    stadium: "Camp Nou",
    players: [1, 2]
  },
  {
    id: 1,
    src: "http://www.gstatic.com/tv/thumb/persons/983712/983712_v9_ba.jpg",
    name: "F.C Barcelona",
    stadium: "Camp Nou",
    players: [1, 2]
  }
]
export async function getAllTeam() {
  return {
    status,
    data
  }
}
export async function getDetailTeamRequest(id) {
  let detail = data.find(x => x.id == id)
  return {
    status,
    detail
  }
}
