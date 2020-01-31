import { trytesToAscii, asciiToTrytes } from "@iota/converter";
import crypto from "crypto";
import { rootCertificates } from "tls";
const { composeAPI } = require("@iota/core");
const {
  channelRoot,
  createChannel,
  createMessage,
  parseMessage,
  mamAttach,
  mamFetch,
  mamFetchAll
} = require("@iota/mam.js");
// Setup the details for the channel.
const sideKey = "SECRETBIG";

// Create a new channel using the details
// You could also load the state from persistence.
const mode = "restricted";
const provider = "https://nodes.devnet.iota.org";
const api = composeAPI({ provider });

// This function is from the previous mam client library
// https://github.com/iotaledger/mam.client.js/blob/master/src/index.js
export const keyGen = (length: number) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  let key = "";
  while (key.length < length) {
    let byte = crypto.randomBytes(1);
    if (byte[0] < 243) {
      key += charset.charAt(byte[0] % 27);
    }
  }
  return key;
};

export const logData = (encodedData: string) => {
  const data = JSON.parse(trytesToAscii(encodedData));
  console.log("Fetched and parsed", data, "\n");
};

async function pullTangleData(root: string) {}

export const initMamChannel = () => {
  const seed = keyGen(81);
  const channelState = createChannel(seed, 2, mode, sideKey);
  console.log("channelState", channelState);
  return channelState;
};

export const createMamChannelBySeed = (seed:string) => {
  const channelState = createChannel(seed, 2, mode, sideKey);
  console.log("channelState", channelState);
  return channelState;
};

// TODO use IMamChannelState type
export const readAllMessages = async (nextRoot: any) => {
  // Try fetching it as well.
  console.log("Fetching from tangle, please wait...");
  let root;
  const fetched = await mamFetchAll(api, nextRoot, mode, sideKey, 20);
  console.log('NUMBER OF MESSAGES ', fetched.length);
  if (fetched && fetched.length > 0) {
      for (let i = 0; i < fetched.length; i++) {
          console.log('Fetched', trytesToAscii(fetched[i].message));
      }
      root = fetched[fetched.length - 1].nextRoot;
  } else {
      console.log('Nothing was fetched from the MAM channel');
  }
  return root;
};

// TODO use IMamChannelState type
export const readMam = async (nextRoot: any) => {
  // Try fetching it as well.
  console.log("Fetching from tangle, please wait...");
  const fetched = await mamFetch(api, nextRoot, mode, sideKey);
  if (fetched) {
    console.log("Fetched", JSON.parse(trytesToAscii(fetched.message)));
  } else {
    console.log("Nothing was fetched from the MAM channel");
  }
};

export const publishMamMessage = async (channel:any) => {
  const payload = {
    message: "Hello MAM World!",
    timestamp: new Date().toLocaleString()
  };
  // Create a MAM message using the channel state.
  const mamMessage = createMessage(
    channel,
    asciiToTrytes(JSON.stringify(payload))
  );

  // Attach the message.
  console.log("Attaching to tangle, please wait...");
  await mamAttach(api, mamMessage, 3, 9);
  console.log(
    `You can view the mam channel here https://utils.iota.org/mam/${mamMessage.root}/${mode}/${sideKey}/devnet`
  );
}