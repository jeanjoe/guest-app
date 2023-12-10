<x-mail::message>
# Halo {{ $user['name'] }}!

Your account has been created with <strong>{{ config('app.name') }}</strong>.

<p>Below are your Login Credentials, It's recommended you change your password after your first login.</p>

<p>username: {{ $user['email'] }}</p>
<p>Password: {{ $password }}</p>


{{-- <x-mail::button :url="{{ route('login') }}">
    LOGIN NOW
</x-mail::button> --}}

<p><small class="text-muted">If you receive this mail in error please discard it. In case of any issues, contact our system Administrators.</small> </p>

Thank You!<br>

<hr />
{{ config('app.name') }}
</x-mail::message>
