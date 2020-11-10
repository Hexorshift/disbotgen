import './styles/app.css';
import React, { useState } from 'react';
import urlencode from 'urlencode';

const App = () => {
  const [permissions] = useState({
    general: [
      {
        id: 1,
        name: 'CREATE_INSTANT_INVITE',
        value: 0x1,
        label: 'Create Instant Invite',
        authentication: false
      },
      {
        id: 2,
        name: 'KICK_MEMBERS',
        value: 0x2,
        label: 'Kick Members',
        authentication: true
      },
      {
        id: 3,
        name: 'BAN_MEMBERS',
        value: 0x4,
        label: 'Ban Members',
        authentication: true
      },
      {
        id: 4,
        name: 'ADMINISTRATOR',
        value: 0x8,
        label: 'Administrator',
        authentication: true
      },
      {
        id: 5,
        name: 'MANAGE_CHANNELS',
        value: 0x10,
        label: 'Manage Channels',
        authentication: true
      },
      {
        id: 6,
        name: 'MANAGE_GUILD',
        value: 0x20,
        label: 'Manage Server',
        authentication: true
      },
      {
        id: 7,
        name: 'CHANGE_NICKNAME',
        value: 0x4000000,
        label: 'Change Nickname',
        authentication: false
      },
      {
        id: 8,
        name: 'MANAGE_NICKNAMES',
        value: 0x8000000,
        label: 'Manage Nicknames',
        authentication: false
      },
      {
        id: 9,
        name: 'MANAGE_ROLES',
        value: 0x10000000,
        label: 'Manage Roles',
        authentication: true
      },
      {
        id: 10,
        name: 'MANAGE_WEBHOOKS',
        value: 0x20000000,
        label: 'Manage Webhooks',
        authentication: true
      },
      {
        id: 11,
        name: 'MANAGE_EMOJIS',
        value: 0x40000000,
        label: 'Manage Emojis',
        authentication: false
      },
      {
        id: 12,
        name: 'VIEW_AUDIT_LOG',
        value: 0x80,
        label: 'View Audit Log',
        authentication: false
      }
    ],
    text: [
      {
        id: 1,
        name: 'ADD_REACTIONS',
        value: 0x40,
        label: 'Add Reactions',
        authentication: false
      },
      {
        id: 2,
        name: 'READ_MESSAGES',
        value: 0x400,
        label: 'Read Messages',
        authentication: false
      },
      {
        id: 3,
        name: 'SEND_MESSAGES',
        value: 0x800,
        label: 'Send Messages',
        authentication: false
      },
      {
        id: 4,
        name: 'SEND_TTS_MESSAGES',
        value: 0x1000,
        label: 'Send TTS Messages',
        authentication: false
      },
      {
        id: 5,
        name: 'MANAGE_MESSAGES',
        value: 0x2000,
        label: 'Manage Messages',
        authentication: true
      },
      {
        id: 6,
        name: 'EMBED_LINKS',
        value: 0x4000,
        label: 'Embed Links',
        authentication: false
      },
      {
        id: 7,
        name: 'ATTACH_FILES',
        value: 0x8000,
        label: 'Attach Files',
        authentication: false
      },
      {
        id: 8,
        name: 'READ_MESSAGE_HISTORY',
        value: 0x10000,
        label: 'Read Message History',
        authentication: false
      },
      {
        id: 9,
        name: 'MENTION_EVERYONE',
        value: 0x20000,
        label: 'Mention @everyone, @here, and all Roles',
        authentication: false
      },
      {
        id: 10,
        name: 'USE_EXTERNAL_EMOJIS',
        value: 0x40000,
        label: 'Use External Emojis',
        authentication: false
      }
    ],
    voice: [
      {
        id: 1,
        name: 'VIEW_CHANNEL',
        value: 0x400,
        label: 'View Channel',
        authentication: false
      },
      {
        id: 2,
        name: 'VOICE_CONNECT',
        value: 0x100000,
        label: 'Connect',
        authentication: false
      },
      {
        id: 3,
        name: 'VOICE_SPEAK',
        value: 0x200000,
        label: 'Speak',
        authentication: false
      },
      {
        id: 4,
        name: 'MUTE_MEMBERS',
        value: 0x400000,
        label: 'Mute Members',
        authentication: false
      },
      {
        id: 5,
        name: 'DEAFEN_MEMBERS',
        value: 0x800000,
        label: 'Deafen Members',
        authentication: false
      },
      {
        id: 6,
        name: 'MOVE_MEMBERS',
        value: 0x1000000,
        label: 'Move Members',
        authentication: false
      },
      {
        id: 7,
        name: 'USE_VAD',
        value: 0x2000000,
        label: 'Use Voice Activity',
        authentication: false
      },
      {
        id: 8,
        name: 'PRIORITY_SPEAKER',
        value: 0x100,
        label: 'Priority Speaker',
        authentication: false
      }
    ]
  });
  const [permissionNumber, setPermissionNumber] = useState(0);
  const [equation, setEquation] = useState([]);
  const [clientId, setClientId] = useState('');
  const [redirectURI, setRedirectURI] = useState('');
  const [scopes, setScopes] = useState('');

  const handleChange = (e, permission) => {
    if (e.target.checked) {
      setPermissionNumber((previousPermissionNumber) => previousPermissionNumber | permission.value);
      equation.push(`0x${permission.value.toString(16)}`);
    } else {
      setPermissionNumber((previousPermissionNumber) => previousPermissionNumber - permission.value);
      setEquation(equation.filter((value) => value !== `0x${permission.value.toString(16)}`));
    }
  }

  const renderGeneralCheckBoxes = () => {
    const list = permissions.general.map((permission) => {
      return (
        <div key={permission.id} className="ml-5">
          <input onChange={(e) => handleChange(e, permission)} type="checkbox" />
          <label className={permission.authentication ? "ml-2 is-size-6 has-text-danger" : "ml-2 is-size-6 has-text-white"}>{permission.label.toUpperCase()}</label>
        </div>
      );
    });

    return list;
  }

  const renderTextCheckBoxes = () => {
    const list = permissions.text.map((permission) => {
      return (
        <div key={permission.id} className="ml-5">
          <input onChange={(e) => handleChange(e, permission)} type="checkbox" />
          <label className={permission.authentication ? "ml-2 is-size-6 has-text-danger" : "ml-2 is-size-6 has-text-white"}>{permission.label.toUpperCase()}</label>
        </div>
      );
    });

    return list;
  }

  const renderVoiceCheckBoxes = () => {
    const list = permissions.voice.map((permission) => {
      return (
        <div key={permission.id} className="ml-5">
          <input onChange={(e) => handleChange(e, permission)} type="checkbox" />
          <label className={permission.authentication ? "ml-2 is-size-6 has-text-danger" : "ml-2 is-size-6 has-text-white"}>{permission.label.toUpperCase()}</label>
        </div>
      );
    });

    return list;
  }

  return (
    <div>
      <div className="tile is-ancestor" style={{ margin: '5.5%' }}>
        <div className="tile is-parent is-vertical container">
          <p className="mb-4"><a className="has-text-white mr-2 is-size-5 button is-primary mb-2" href="https://www.zaytunhub.com/" style={{ textDecoration: 'underline', boxShadow: '3px 3px #7289DA' }}>ZaytunHub Home</a><a className="has-text-white is-size-5 button is-primary" href="https://www.zaytunhub.com/join" style={{ textDecoration: 'underline', boxShadow: '3px 3px #7289DA' }}>Join us</a>
          </p>
          <div className="tile is-child box has-background-primary pt-3 pb-2" style={{ boxShadow: '3px 3px #7289DA' }}>
            <h1 className="is-size-4 has-text-white"><i className="fab fa-discord fa-2x mr-2" />DISCORD BOT URL INVITE GENERATOR</h1>
          </div>
          <div className="tile is-parent box has-background-primary pt-0 pb-0" style={{ boxShadow: '3px 3px #7289DA' }}>
            <div className="tile is-child box is-radiusless has-text-white" style={{ backgroundColor: 'transparent' }}>
              <label className="is-size-4">CLIENT ID</label>
              <input
                onChange={(e) => setClientId(e.target.value)}
                className="input"
                style={{ backgroundColor: 'transparent', color: 'white', border: 'none', padding: 0, borderBottom: '1px solid #7289DA', borderRadius: 0 }}
                placeholder="ENTER YOUR CLIENT ID"
                defaultValue={clientId} />
              <label className="is-size-4">REDIRECT URI</label>
              <input
                onChange={(e) => setRedirectURI(e.target.value)}
                className="input"
                style={{ backgroundColor: 'transparent', color: 'white', border: 'none', padding: 0, borderBottom: '1px solid #7289DA', borderRadius: 0 }}
                placeholder="ENTER YOUR REDIRECT URI (OPTIONAL)"
                defaultValue={redirectURI} />
              <label className="is-size-4">SCOPE</label>
              <input
                onChange={(e) => setScopes(e.target.value)}
                className="input"
                style={{ backgroundColor: 'transparent', color: 'white', border: 'none', padding: 0, borderBottom: '1px solid #7289DA', borderRadius: 0 }}
                placeholder="ENTER YOUR SCOPE(S)"
                defaultValue={scopes} />
              <h1 className="pt-5 has-text-danger">BOT OWNERS MUST HAVE <a
                className="has-text-danger"
                href='https://support.discord.com/hc/en-us/articles/219576828-Setting-up-Two-Factor-Authentication'
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'underline' }}>2 FACTOR AUTHENTICATION</a> ENABLED IF THE SERVER REQUIRES 2FA*</h1>
            </div>
            <div className="tile is-child box is-radiusless" style={{ backgroundColor: 'transparent' }}>
              <h1 className="is-size-4">GENERAL PERMISSIONS</h1>
              {renderGeneralCheckBoxes()}
            </div>
            <div className="tile is-child box is-radiusless" style={{ backgroundColor: 'transparent' }}>
              <h1 className="is-size-4">TEXT PERMISSIONS</h1>
              {renderTextCheckBoxes()}
            </div>
            <div className="tile is-child box is-radiusless" style={{ backgroundColor: 'transparent' }}>
              <h1 className="is-size-4">VOICE PERMISSIONS</h1>
              {renderVoiceCheckBoxes()}
            </div>
          </div>
          <div className="tile is-child box has-background-primary pt-2 pb-2" style={{ boxShadow: '3px 3px #7289DA' }}>
            <h1 className="is-pulled-right">Made by <span style={{ fontWeight: 'bold' }}>Zyleaf#1018</span> with 💖</h1>
            <h1 className="is-size-5">PERMISSIONS: <span className="has-text-danger">{permissionNumber}</span></h1>
            <p className="is-size-6">EQUATION: <span className="has-text-danger">{permissionNumber} = {equation.join(" | ")}</span></p>
            <p className="is-size-6">
              LINK: <a className="has-text-danger"
                href={`https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissionNumber}${redirectURI ? ` & redirect_uri=${redirectURI}` : ``}`}
                style={{ textDecoration: 'underline', overflowWrap: 'break-word' }}>
                https://discord.com/oauth2/authorize?client_id={clientId}&scope={scopes ? urlencode(scopes.toLowerCase()) : 'bot'}&permissions={permissionNumber}{redirectURI ? `&redirect_uri=${urlencode(redirectURI)}` : ``}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
