const root = document.getElementById("root");
const btn = document.getElementById("btn");
const errorMsg = "Internet connection error";

const fields = ["continent", "country", "region", "regionName", "city", "district"].join(
  ","
);

const identifyIP = async () => {
  const request = await fetch("https://api.ipify.org/?format=json");
  const response = await request.json();
  return response.ip;
};

const getInfo = async ip => {
  const request = await fetch(`http://ip-api.com/json/${ip}?fields=${fields}`);

  return await request.json()
};

const renderInfo = info => {
  let result = "";
  for (let [category, value] of Object.entries(info)) {
    const str = `<p>${category}: ${value || "no info"}</p>`;
    result += str;
  }

  return result;
};

const handleClick = async () => {
  try {
    const ip = await identifyIP();
    const info = await getInfo(ip);
    const result = renderInfo(info);
    root.innerHTML = result;
  } catch (error) {
    root.innerHTML = `<p style="color:red; font-size: 24px;">${errorMsg}</p>`;
  }
};

btn.addEventListener("click", handleClick);
