# 🚀 Deploy SendGrid Web API Fix - Clean Guide

## Problem: Render SMTP Timeout

**Error in Render logs:**
```
❌ Email sending failed: Connection timeout
```

**Cause:** Render blocks SMTP port 587. Need to use SendGrid Web API instead.

---

## Solution: 3 Simple Steps

### Step 1: Add Environment Variable to Render (2 min)

1. Go to: https://dashboard.render.com/
2. Click your service: `bloomer-backend`
3. Click: **Environment** (left sidebar)
4. Click: **Add Environment Variable**
5. Add:
   ```
   Key:   SENDGRID_API_KEY
   Value: [Get from .env file or SendGrid dashboard]
   ```
6. Click: **Save Changes**

**Note:** Do NOT put your actual API key in this documentation!

---

### Step 2: Deploy the Code Changes (1 min)

The code has already been updated to use SendGrid Web API. Just commit and push:

```bash
# Commit changes
git add -A
git commit -m "fix: Switch to SendGrid Web API to resolve Render SMTP timeout"

# Push to trigger deployment
git push origin main
```

---

### Step 3: Verify After Deployment (2 min)

Wait 2-3 minutes for Render to deploy, then check **Render Logs**:

#### ✅ Success:
```
📧 Email service in PRODUCTION mode (using SendGrid Web API)
✅ Welcome email sent to user@example.com via SendGrid Web API
   Response status: 202
```

#### ❌ Still Failing:
```
❌ Email sending failed: Connection timeout
```
→ Go back to Step 1, make sure `SENDGRID_API_KEY` is added

---

## What Changed

### Before (SMTP - Blocked):
- Used nodemailer with SMTP
- Port 587 (blocked by Render)
- Connection timeout errors

### After (Web API - Works):
- Uses `@sendgrid/mail` package
- HTTPS API (not blocked)
- Reliable email delivery

---

## Troubleshooting

### "API key not found"
- Add `SENDGRID_API_KEY` to Render dashboard
- Save changes and wait for redeploy

### "Sender not verified"
- Go to: https://app.sendgrid.com/settings/sender_auth/senders
- Verify your sender email
- Wait 5 minutes and test again

### "Unauthorized"
- Check `SENDGRID_API_KEY` value in Render
- Must start with `SG.`
- No extra spaces or quotes

---

## Important Notes

- ✅ Your API key is in `.env` (local, gitignored)
- ✅ Your API key should be in Render dashboard (production)
- ❌ Never commit API keys to git
- ❌ Never put API keys in documentation files

---

**Ready to deploy? Follow the 3 steps above!** 🚀
