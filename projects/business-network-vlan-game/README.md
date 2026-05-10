# BusinessNet VLAN Cisco Router Lab Game

**Author:** Logan Garth Goodwin

BusinessNet VLAN Cisco Router Lab is a browser-based networking game where the player configures a realistic five-person business network with three difficulty levels and two VLANs:

- **VLAN 10 - HARDWARE:** five employee computers and the shared printer
- **VLAN 20 - PHONES:** five business phones / voice devices

The lab is an educational simulation. It uses Cisco-style router and switch commands, but it is not affiliated with Cisco and does not require Cisco Packet Tracer.

## How to Play

Open `index.html` in a web browser.

Choose **Easy**, **Normal**, or **Hard**. Type commands into the console and press Enter. The mission checklist, topology cards, device status lights, and score update as the network is configured.

You can also click **Run Demo Config** to watch the full working setup.

## Difficulty Levels

| Level | How It Works |
|---|---|
| **Easy** | A guided command builder writes and runs the commands for each task. This helps new learners see what commands are needed and what each section does. |
| **Normal** | The player types the commands manually, but hints, the accepted-command list, and the demo configuration are available. |
| **Hard** | Hints, demo configuration, and the accepted-command list are hidden. The player must use the business specs and know the Cisco-style commands. |

## Business Network Requirements

| Area | Required Configuration |
|---|---|
| Router Hostname | `BRANCH-R1` |
| VLAN 10 Name | `HARDWARE` |
| VLAN 10 Subnet | `192.168.10.0/24` |
| VLAN 10 Gateway | `192.168.10.1` on `G0/0.10` |
| VLAN 10 DHCP | PCs receive `192.168.10.21-25` |
| Printer | Static IP `192.168.10.50`, gateway `192.168.10.1` |
| VLAN 20 Name | `PHONES` |
| VLAN 20 Subnet | `192.168.20.0/24` |
| VLAN 20 Gateway | `192.168.20.1` on `G0/0.20` |
| VLAN 20 DHCP | Phones receive `192.168.20.21-25` |
| Voice DHCP Option | Option 150 / TFTP server `192.168.20.10` |
| Switch User Ports | `Fa0/1-5` access VLAN 10 and voice VLAN 20 |
| Switch Router Uplink | `Fa0/24` trunk, allowed VLANs `10,20` |
| Router WAN | `G0/1` = `10.0.0.1/30` |
| Firewall WAN | `10.0.0.2/30` |
| Default Route | `0.0.0.0/0` via `10.0.0.2` |
| DNS | `8.8.8.8` |

## Winning Configuration

```text
enable
configure terminal
hostname BRANCH-R1
vlan 10
name HARDWARE
exit
vlan 20
name PHONES
exit
interface range fa0/1-5
switchport mode access
switchport access vlan 10
switchport voice vlan 20
exit
interface fa0/24
switchport mode trunk
switchport trunk allowed vlan 10,20
no shutdown
exit
interface gigabitEthernet0/0
no ip address
no shutdown
exit
interface gigabitEthernet0/0.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0
ip nat inside
exit
interface gigabitEthernet0/0.20
encapsulation dot1Q 20
ip address 192.168.20.1 255.255.255.0
ip nat inside
exit
interface gigabitEthernet0/1
ip address 10.0.0.1 255.255.255.252
no shutdown
ip nat outside
exit
ip dhcp excluded-address 192.168.10.1 192.168.10.20
ip dhcp excluded-address 192.168.10.50 192.168.10.50
ip dhcp excluded-address 192.168.20.1 192.168.20.20
ip dhcp excluded-address 192.168.20.10 192.168.20.10
ip dhcp pool HARDWARE
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
dns-server 8.8.8.8
exit
ip dhcp pool PHONES
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
dns-server 8.8.8.8
option 150 ip 192.168.20.10
exit
access-list 10 permit 192.168.10.0 0.0.0.255
access-list 20 permit 192.168.20.0 0.0.0.255
ip nat inside source list 10 interface gigabitEthernet0/1 overload
ip nat inside source list 20 interface gigabitEthernet0/1 overload
ip route 0.0.0.0 0.0.0.0 10.0.0.2
printer ip 192.168.10.50
printer gateway 192.168.10.1
printer online
firewall enable
firewall wan 10.0.0.2 255.255.255.252
firewall gateway 10.0.0.1
firewall allow vlan 10 outbound
firewall allow vlan 20 outbound
firewall allow tcp 80
firewall allow tcp 443
firewall allow udp 53
firewall allow udp 5060
firewall deny inbound any
end
write memory
test network
```

## Helpful Commands

```text
help
hint
show vlan brief
show interfaces trunk
show ip interface brief
show running-config
show ip dhcp binding
show ip route
show nat
show firewall
ping 192.168.10.1
ping 192.168.20.1
ping 192.168.10.50
ping 8.8.8.8
test hardware
test phones
test network
reset lab
```

## GitHub Pages Setup

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `game.js`, and `README.md`.
3. Go to **Settings > Pages**.
4. Set the source to the main branch and root folder.
5. Open the GitHub Pages link after it publishes.

## Portfolio Description

BusinessNet VLAN Router Lab is an interactive browser-based networking game with Easy, Normal, and Hard modes that teaches VLAN segmentation, router-on-a-stick inter-VLAN routing, DHCP scopes, voice VLANs, switch trunking, NAT, firewall rules, and basic business network validation. Players configure a two-VLAN five-person business network and test whether PCs, phones, printer, router, firewall, and internet connectivity work correctly.
