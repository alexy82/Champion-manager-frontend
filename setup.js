module.exports = {
  env: "production",
  log_enabled: true,
  omToken: "72c02834889ff4da919b5500de27f39e",
  wms_secret_key: "YOqwBvE48UqtFWltBuB6faQ2JcxGCOAO",
  hosts: {
    accounting: "accounting-hub.teko.vn",
    om: "om.teko.vn",
    wms: "api-wms.phongvu.vn",
    sso: "acc.teko.vn"
  },
  time_presence: 60,
  protocol: "https",
  googleClientId: "384559672688-caaiimsnghfjep71qnujh2ls0lj66jgl.apps.googleusercontent.com",
  googleClientSecret: "D8UVeLSYREbkERWgnD3yPgVE",
  redirect_uri: "https://vnshop-ops.teko.vn",
  seriOptions: [
    {
      value: "kyhieu",
      label: "VNShop - VS/19E"
    },
    {
      value: "kyhieu",
      label: "Phong Vũ - PV/18E"
    }
  ],
  templateOptions: [
    {
      value: "mauso",
      label: "03XKNB0/001"
    },
    {
      value: "mauso",
      label: "01GTKT0/001"
    }
  ],
  recommendWms: {
    "": {
      northern: "CH0910",
      central: "CH1001",
      southern: "CH0000"
    },
    "1": {
      northern: "CH0910",
      central: "CH1001",
      southern: "CH0000"
    },
    "2": {
      northern: "KC",
      central: "K2",
      southern: "K4"
    }
  }
}
