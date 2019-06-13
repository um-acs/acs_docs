# Pegasus Job Queues

Pegasus queues are organized using limits like job size, job length, job
purpose, and project. In general, users run jobs on Pegasus with equal
resource shares. Current or recent resource usage lowers the priority
applied when LSF assigns resources for new jobs from a user's account.

Parallel jobs are more difficult to schedule as they are inherently
larger. Serial jobs can "fit into" the gaps left by larger jobs if
serial jobs use short enough run time limits and small enough numbers of
processors.

The **parallel** queue is available for jobs requiring 16 or more cores.
Submitting jobs to this queue ***requires*** resource distribution ` -R
"span[ptile=16]".  `

The **bigmem** queue is available for jobs requiring nodes with expanded
memory. Submitting jobs to this queue requires project membership. Do
not submit jobs that can run on the general and parallel queues to the
bigmem queue. ***Jobs using less than 1.5G of memory per core on the
bigmem queue are in violation of acceptable use policies and the CCS
account responsible for those jobs may be suspended***
([Policies](https://ccs.miami.edu/ac/policies)).

  

<table>
<thead>
<tr class="header">
<th>Queue Name</th>
<th>Processors (Cores)</th>
<th>Memory</th>
<th>Wall time<br />
default / max</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>general</code></td>
<td>15-</td>
<td>25GB max</td>
<td>1 day / 7 days</td>
<td>jobs up to 15 cores, up to 25GB memory</td>
</tr>
<tr class="even">
<td><code>parallel</code></td>
<td>16+</td>
<td>25GB max</td>
<td>1 day / 7 days</td>
<td>parallel jobs requiring 16 or more cores, up to 25GB memory <strong><em>requires resource distribution</em></strong> <code>-R "span[ptile=16]"</code></td>
</tr>
<tr class="odd">
<td><code>bigmem</code></td>
<td>64 max</td>
<td>250GB max</td>
<td>4 hours / 5 days</td>
<td>jobs requiring nodes with expanded memory</td>
</tr>
<tr class="even">
<td><code>debug</code></td>
<td>64 max</td>
<td>25GB Max</td>
<td>30 mins / 30 mins</td>
<td>job debugging</td>
</tr>
<tr class="odd">
<td><code>interactive</code></td>
<td>15-</td>
<td>250GB max</td>
<td>6 hours / 1 day</td>
<td>interactive jobs only <strong><em>max 1 job per user</em></strong></td>
</tr>
<tr class="even">
<td><code>gpu</code></td>
<td>320 max</td>
<td>-</td>
<td>1 day / 7 days</td>
<td>gpu debugging <strong><em>restricted queue</em></strong></td>
</tr>
<tr class="odd">
<td><code>phi</code></td>
<td>320 max</td>
<td>-</td>
<td>1 day / 7 days</td>
<td>phi debugging <strong><em>restricted queue</em></strong></td>
</tr>
</tbody>
</table>
