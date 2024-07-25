https://<FQDN>/?:101/:sameaccountnameofnewjoiner

1.Logged-in user Sail-point Authentication 
2.Get the access-token using service account
3.Check logged in user is part of the end user computing governance group or not
	https://{{tenant}}/beta/workgroups?filters=name eq "End User Computing" and memberships.identityId eq <logged-in-user-id>
	a.If No Results -> Redirect to unauthorised page
	b.If Results available in JSON -> Continue flow
4.Invoke https://{{tenant}}/v3/search (payload - svc_idn_euc_que_dev) api to get the owner_id.
5.Invoke https://{{tenant}}/work-items?ownerId=<owner_id> to get the all the work items
	Iterate all the work items and find the new hire user samaccount with status pending is exist or not
	a.If Not Exist -> Redirect to unauthorised page
	b.If Exist -> Continue flow
6.Display the computing form page by using https://{{tenant}}/v3/search 
7.Select Overriding manager approval
8.Submit Request
	Invoke Approve work item - https://{{tenant}}/work-items/:id/approve/:approvalItemId
	Invoke Complete work item - https://{{tenant}}/work-items/:id
