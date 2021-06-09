import Config from '../config.json'

const contracts = {}

export function handleMessage (message) {
  if (isSlayerContractMessage(message)) {
    recordSlayerContractMessage(message)
  }
}

export function isSlayerContractMessage (message) {
  // const isContractChannel = Config.contractChannelIds.indexOf(message.channel.id) > -1
  const hasSlayerMention = message.mentions.roles.find(role => role.id === Config.slayerRoleId)
  const hasPlayerMention = message.mentions.users.size > 0
  return hasSlayerMention && hasPlayerMention
}

export function recordSlayerContractMessage (message) {
  if (!isSlayerContractMessage(message)) {
    return;
  }

  message.mentions.users.forEach(user => {
    if (!contracts[user.id]) {
      contracts[user.id] = []
    }
    contracts[user.id].push(message.id)
  })
}

export function getContractsByPlayer (playerId) {
  return contracts[playerId]
}

export function getContracts() {
  return contracts
}