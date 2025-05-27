# 🧾 `pnpm` Cheat Sheet

## 📦 Installation

```bash
npm install -g pnpm
```

---

## 🔧 Project Setup

```bash
pnpm init                    # Create new package.json
pnpm install                 # Install dependencies
pnpm add <package>           # Add package
pnpm add -D <package>        # Add dev dependency
pnpm remove <package>        # Remove a package
pnpm update                  # Update packages
```

### 💡 Bonus: Use Templates or Scaffolds

You can automate this using `pnpm create`:

```bash
pnpm create vite libs/my-app --template react-ts
```

Just make sure the output folder (`libs/my-app`) is under a path matched by your workspace config.

---

## 🚀 Scripts

```bash
pnpm run <script>            # Run a script (from package.json)
pnpm dev                     # Shortcut if "dev" is in scripts
pnpm build                   # Run build script
pnpm start                   # Start app
```

---

## 📁 Workspaces (Monorepo)

> Must define `packages` in root `pnpm-workspace.yaml`

```bash
pnpm recursive install       # Install all workspace deps
pnpm recursive run build     # Run build in all packages
pnpm -F <pkg> run <script>   # Run script in specific package
```

---

## 🔗 Linking (Local Libraries)

```bash
pnpm link --global ./my-lib        # Create global symlink
pnpm link my-lib                   # Link into current project
pnpm unlink my-lib                 # Remove local link
```

---

## 💾 Cache & Store

```bash
pnpm store path                   # Show path to pnpm store
pnpm store prune                  # Remove unreferenced packages
pnpm store add <pkg>              # Pre-fetch a package
```

---

## 🧪 Testing & Misc

```bash
pnpm dlx <tool>                   # Run a tool without installing globally (like npx)
pnpm why <package>                # Show why a package is installed
pnpm list                         # List installed packages
pnpm outdated                     # Show outdated packages
```

---

## 🔒 Lockfile

```bash
pnpm install --frozen-lockfile    # Fail if lockfile is out of sync
```
