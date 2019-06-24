type Firmware = string | 'Up To Date'

export enum RingDeviceType {
  BaseStation = 'hub.redsky',
  Keypad = 'security-keypad',
  SecurityPanel = 'security-panel',
  ContactSensor = 'sensor.contact',
  MotionSensor = 'sensor.motion',
  RangeExtender = 'range-extender.zwave',
  ZigbeeAdapter = 'adapter.zigbee',
  AccessCodeVault = 'access-code.vault',
  AccessCode = 'access-code',
  SmokeAlarm = 'alarm.smoke',
  CoAlarm = 'alarm.co',
  SmokeCoListener = 'listener.smoke-co',
  MultiLevelSwitch = 'switch.multilevel',
  BeamsMotionSensor = 'motion-sensor.beams',
  BeamsSwitch = 'switch.multilevel.beams',
  BeamsLightGroupSwitch = 'group.light-group.beams',
  BeamsTransformerSwitch = 'switch.transformer.beams'
}

// TODO: get all camera kinds
export enum RingCameraKind {
  DoorbellPro = 'lpd_v2',
  Floodlight = 'hp_cam_v1'
}

export type AlarmMode = 'all' | 'some' | 'none'
export type MessageType =
  | 'RoomGetList'
  | 'SessionInfo'
  | 'DeviceInfoDocGetList'
  | 'DeviceInfoSet'
export type MessageDataType =
  | 'RoomListV2Type'
  | 'SessionInfoType'
  | 'DeviceInfoDocType'
  | 'DeviceInfoSetType'
  | 'HubDisconnectionEventType'

export interface SocketIoMessage {
  msg: MessageType
  datatype: MessageDataType
  src: string
  body: any[]
}

export type AssetKind = 'base_station_v1' | 'beams_bridge_v1'

export interface AssetSession {
  assetUuid: string
  connectionStatus: 'unknown' | 'cell-backup' | 'online'
  doorbotId: number
  kind: AssetKind
  sessionId: number
}

export type AlarmState =
  | 'burglar-alarm' // Ring is Alarming
  | 'entry-delay' // Alarm will sound in ${timeLeft} seconds
  | 'fire-alarm' // Alarming - Smoke
  | 'co-alarm' // Alarming - CO
  | 'panic' // Panic Triggered
  | 'user-verified-burglar-alarm' // Alarming - User Verified Police
  | 'user-verified-co-or-fire-alarm' // Alarming - User Verified Smoke or CO
  | 'burglar-accelerated-alarm' // Alarming - Police Response Requested
  | 'fire-accelerated-alarm' // Alarming - Fire Department Response Requested

export interface RingDeviceData {
  zid: string
  name: string
  deviceType: RingDeviceType
  batteryLevel?: number
  batteryStatus: 'full' | 'ok' | 'low' | 'none' | 'charging'
  batteryBackup?: 'charged' | 'charging'
  manufacturerName?: string
  serialNumber?: string
  tamperStatus: 'ok' | 'tamper'
  faulted?: boolean
  locked?: 'jammed' | 'locked' | 'unlocked' | 'unknown'
  roomId?: number
  volume?: number
  mode?: AlarmMode
  transitionDelayEndTimestamp?: number | null
  alarmInfo?: {
    state: AlarmState
    faultedDevices?: string[]
    timestamp?: number
    uuid?: string
  }
  siren?: { state: 'on' | 'off' }
  alarmStatus?: 'active'
  co?: { alarmStatus?: 'active' }
  smoke?: { alarmStatus?: 'active' }
  motionStatus?: 'clear' | 'faulted'
  groupId?: string

  // switch
  on?: boolean
  // switch.multilevel
  level?: number // 0 - 1
  hs?: {
    hue?: number // 0 - 1
    sat?: number // 0 - 1
  }
  ct?: number // 0 - 1
}

export const deviceTypesWithVolume = [
  RingDeviceType.BaseStation,
  RingDeviceType.Keypad
]

export interface BaseStation {
  address: string
  alerts: any[]
  description: string
  device_id: string
  features: null
  firmware_version: Firmware
  id: number
  kind: string
  latitude: number
  location_id: string
  longitude: number
  owned: boolean
  owner?: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  ring_id: null
  settings: null
  stolen: boolean
  time_zone: string
}

export interface BeamBridge {
  created_at: string
  description: string
  hardware_id: string
  id: number
  kind: string
  location_id: string
  metadata: { ethernet: boolean; legacy_fw_migrated: boolean }
  owner_id: number
  role: string
  updated_at: string
}

export interface LocationAddress {
  address1: string
  address2: string
  cross_street: string
  city: string
  state: string
  timezone: string
  zip_code: string
}

export interface UserLocation {
  address: LocationAddress
  created_at: string
  geo_coordinates: { latitude: string; longitude: string }
  geo_service_verified: 'address_only' | string
  location_id: string
  name: string
  owner_id: number
  updated_at: string
  user_verified: boolean
}

export interface TicketAsset {
  doorbotId: number
  kind: AssetKind
  onBattery: boolean
  status: 'online' | 'offline'
  uuid: string
}

export interface CameraData {
  id: number
  description: string
  device_id: string
  time_zone: string
  subscribed: boolean
  subscribed_motions: boolean
  battery_life: number | string // 4003 or "100"
  external_connection: boolean
  firmware_version: Firmware
  kind: RingCameraKind | string
  latitude: number
  longitude: number
  address: string
  settings: {
    enable_vod: boolean
    motion_zones: {
      enable_audio: false
      active_motion_filter: number
      sensitivity: number
      advanced_object_settings: any
      zone1: any
      zone2: any
      zone3: any
      motion_snooze_preset_profile: string
      live_view_preset_profile: string
      live_view_presets: string[]
      motion_snooze_presets: string[]
      doorbell_volume: number
      chime_settings: any
      video_settings: any
      motion_announcement: boolean
      stream_setting: number
      advanced_motion_detection_enabled: boolean
      advanced_motion_detection_human_only_mode: boolean
      luma_night_threshold: number
      enable_audio_recording: boolean | null
      people_detection_eligible: false
      pir_settings?: any
      pir_motion_zones?: number[]
      floodlight_settings?: any
      light_schedule_settings?: any
      luma_light_threshold?: number
    }
  }
  features: {
    motions_enabled: boolean
    show_recordings: boolean
    advanced_motion_enabled: boolean
    people_only_enabled: boolean
    shadow_correction_enabled: boolean
    motion_message_enabled: boolean
    night_vision_enabled: boolean
  }
  owned: boolean
  alerts: {
    connection: 'online' | 'offline' | string
    battery?: 'low' | string
  }
  motion_snooze: {
    scheduled: boolean
  }
  stolen: boolean
  location_id: string
  ring_id: null
  owner: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  led_status?: 'on' | 'off'
  night_mode_status: 'true' | 'false'
  ring_cam_light_installed?: 'true' | 'false'
  ring_cam_setup_flow?: 'floodlight'
  siren_status?: {
    started_at?: string
    duration?: string
    ends_at?: string
    seconds_remaining: number
  }
}

export interface CameraHealth {
  id: number
  wifi_name: string
  battery_percentage: string
  battery_percentage_category: string
  battery_voltage: number | null
  battery_voltage_category: string | null
  latest_signal_strength: number
  latest_signal_category: string
  average_signal_strength: number
  average_signal_category: string
  firmware: Firmware
  updated_at: 'string'
  wifi_is_ring_network: boolean
  packet_loss_category: string
  packet_loss_strength: number
}

export type DingKind =
  | 'motion'
  | 'ding'
  | 'on_demand' // Live View
  | 'alarm' // Linked Event - Alarm
  | 'on_demand_link' // Linked Event - Motion

export interface LocationEvent {
  created_at: string
  cv_properties: {
    person_detected: null | any
    stream_broken: null | any
  }
  ding_id: number
  ding_id_str: string
  doorbot_id: number
  favorite: boolean
  kind: DingKind
  recorded: false
  recording_status: 'ready' | 'audio_ready'
  state: 'timed_out' | 'completed' // answered
}

export interface HistoricalDingByDoorbotId {
  id: number
  created_at: string
  answered: boolean
  events: any[]
  kind: DingKind
  favorite: boolean
  snapshot_url: string
  recording: {
    status: 'ready' | 'audio_ready' | null
  }
  duration: number
  cv_properties: {
    person_detected: null
    stream_broken: null
  }
}

export interface HistoricalDingGlobal extends HistoricalDingByDoorbotId {
  doorbot: {
    id: number
    description: string
  }
}

// timed_out + ding === Missed Ring

export interface ActiveDing {
  id: number
  id_str: string
  state: 'ringing'
  protocol: 'sip'
  doorbot_id: number
  doorbot_description: string
  device_kind: RingCameraKind | string
  motion: boolean
  snapshot_url: ''
  kind: DingKind
  sip_server_ip: string
  sip_server_port: number
  sip_server_tls: boolean
  sip_session_id: string
  sip_from: string
  sip_to: string
  audio_jitter_buffer_ms: number
  video_jitter_buffer_ms: number
  sip_endpoints: null
  expires_in: number
  now: number
  optimization_level: number
  sip_token: string
  sip_ding_id: string
}

export interface SnapshotTimestamp {
  timestamp: number
  doorbot_id: number
}